---
title: Homogeneous Pipelines with Docker
date: "2016-09-26T09:55:17.000Z"
layout: post
---

[Continuous Integration Build Pipelines](http://martinfowler.com/articles/continuousIntegration.html)
are a dirty, nasty place. What usually starts out as a couple of simple tasks or bash scripts
inevitably ends up as a heap of scripts, Gradle/Rake/Maven/(insert build tool here) tasks, and
manually configured jobs held together with a thin layer of Elmer's glue and Scotch tape.

Why? Partly because modern applications are complex; even simple stacks use multiple languages and
tools. And partly because developers are lazy, and sometimes hesitant to "mess with the pipeline." I
don't often see the amount of rigor in cleanliness applied to them as to other parts of the
codebase, leading to unnecessarily complex and unfortunately tangled build pipelines.

So, my current team attacked this head-on using a great piece of technology:
[Docker](https://www.docker.com)! Using Docker as our sole interface to running things in our build
pipeline, we sped it up, simplified it, and lived happily ever after.

To give credit where credit is due, the implementation of this pattern was spearheaded by my
colleague [Amber Houle](https://twitter.com/amber_ht).

<!-- more -->

## Anatomy of a Pipeline

This is pretty much what our build pipeline looked like in the time before Docker. Notice the amount
of variation in what is being invoked in each step! (All these steps could be wrapped up in bash
scripts, but I've unravelled them here.)

_"client" is a JS front-end application. "api" is a Java-based API._

```yaml
# pipeline.yaml

build_client:
  - npm install       # Install JS dependencies
  - npm run webpack   # Compile to JS

build_api:
  - gradle build      # Compile Java

test_client:
  - npm install       # Install JS dependencies..... again
  - npm test          # Run JS tests

test_api:
  - systemctl start postgresql.service  # Start up Postgres
  - flyway migrate                      # Migrate the database using Flyway
  - gradle test                         # Run Java tests (unit and integration)
  - systemctl stop postgresql.service   # Stop Postgres

package_client:
  - npm install       # Install JS dependencies once again :(
  - npm run package   # Package up the JS into a .zip or .tar
  - <push JS code to artifact repository>

package_api:
  - gradle package    # Create an executable .jar
  - <push Java code to artifact repository>

deploy_to_qa:
  - <pull code from artifact repo and deploy>
```

Let's first examine a build pipeline that you might find using any of the modern open-source
distributed build and deploy tools such as [Jenkins](https://jenkins.io/),
[Go.cd](https://www.go.cd/), or [TravisCI](https://travis-ci.com/). It's broken down into a series
of stages or jobs, which could be run sequentially or in parallel. Because these tools usually run
as a [master/agent architecture](https://jenkins.io/doc/book/architecting-for-scale/), the server
will delegate the actual work of each stage to an available build agent.

### Pipeline complexities

While this architecture is scalable and flexible, it creates complexities that **you** have to
manage. Since each stage in your pipeline has a different job to do, all your agents must be
configured to perform all needed actions. Some stages need a JavaScript runtime, some need Java,
while others need a Postgres database. Traditionally, this calls for provisioning your agents with
all the appropriate software ahead of time. And herein lies a dilemma. Manually provisioning might
work fine if you only have 1 or 2 agents, but that quickly becomes tedious as the number of
dependencies you have increases or the number of agents you need increases. Automated provisioning
using Chef or Puppet is an option, but this creates one more piece of code to build, manage, test,
and debug.

As each agent picks up a stage to run, it's going to need some input, which is often just a copy of
your source code at a specific revision. Because any agent could be picking up any job at any time,
the sequence is usually 1) start with a clean workspace 2) checkout the code 3) install
dependencies 4) do stuff. All these steps take time, especially installing dependencies. (There are
3 `npm install` commands in the pipeline shown above)

## Docker as the Pipeline Interface

> Docker containers wrap a piece of software in a complete filesystem that contains everything
> needed to run: code, runtime, system tools, system libraries – anything that can be installed on a
> server. <br/> <cite>https://www.docker.com/what-docker</cite>

What if we extend this statement to say that containers contain everything needed to run.... **and
build and test**? Instead of provisioning build agents with all the individual pieces of software
and dependencies that our pipeline needs, let's provision them with only the Docker Engine. Now, the
sequence of steps for any stage becomes 1) Pull down a Docker image 2) Execute `docker run`
<https://docs.docker.com/engine/reference/run/>.

To pull this off, we first need to create some Docker images with **everything our application needs
to build and test itself**, which we specify with a
[Dockerfile](https://docs.docker.com/engine/reference/builder/).

```docker
# Dockerfile for Java API

FROM java:8

COPY build.gradle ./
COPY src ./src/

RUN gradle jar

ENTRYPOINT ["gradle"]
```

```docker
# Dockerfile for database migrations

FROM shouldbee/flyway

COPY ./src/main/resources/db/migration/*.sql ./sql/

ENTRYPOINT ["flyway"]
```

```docker
# Dockerfile for JS client

FROM node:6.4.0

COPY package.json ./
RUN npm install
COPY src ./src/
RUN npm run webpack

ENTRYPOINT [ "npm", "run" ]
```

And this is pretty much what our pipeline evolved into after transitioning to Docker...

```yaml
# pipeline.yaml

build_client:
  - docker build -t client:${PIPELINE_ID} ./client  # Build Docker image
  - docker push client:${PIPELINE_ID}               # Push it to the container registry

build_api:
  - docker build -t api:${PIPELINE_ID} ./api
  - docker build -t migrations:${PIPELINE_ID} ./api

  - docker push api:${PIPELINE_ID}
  - docker push migrations:${PIPELINE_ID}

test_client:
  - docker pull client:${PIPELINE_ID}
  - docker run client:${PIPELINE_ID} test   # Run `npm run test` inside of the client container

test_api:
  - docker pull api:${PIPELINE_ID}
  - docker pull migrations:${PIPELINE_ID}

  - docker run migrations:${PIPELINE_ID} migrate  # Run `flyway migrate` inside of the migrations container
  - docker run api:${PIPELINE_ID} test            # Run `gradle test` inside of the api container
```

### Complexities simplified

Overall, this had a number of positive effects on our build pipeline. First, **speed**: the time
from pipeline start to ready to deploy to a QA environment dropped from ~12 minutes to ~4 minutes!
This was largely due to no longer checking out the entire code base, installing dependencies, and
re-compiling in each step of the pipeline. Second, **simplicity.** Configuring new build agents is
now easy, as they only need Docker Engine. The single command interface is also cognitively simple.
Each call to `docker run [COMMAND]` in the pipeline acts as a proxy to the task runner already in
use in the codebase (e.g `gradle [COMMAND]` or `npm run [COMMAND]`), making it work just like local
development without Docker.

The main possible issue I see with this is that the Docker container has a large surface area, which
kind of goes against the advice from Docker to keep images as slim and trim as possible. I normally
would not include all my test code into the deployable artifact that will eventually end up on my
production server. Instead we have copied **all** the source and test code into the image. This
could introduce dependency issues, such as security holes that may exist in libraries pulled in by
test code. I have not observed this in practice though.

You will also notice that we push the Docker image to the registry right away. This ensures that the
artifact that passes down the pipeline is exactly the same all the way through build, test, and
deploy. But, it also means we are creating an artifact for un-verified code. What if the tests fail
for a certain commit, but we have already created and pushed the Docker image? Do we leave it in the
registry? Remove it? So far, we have just left them there, so not sure how this will play out in the
long term.

Overall, this pattern has worked well for the team! Would love to hear your opinions and experiences
with Docker in a build pipeline.
