---
title: Database Migrations Best Practices
date: "2015-08-15T15:53:23.000Z"
---

Only once have I worked on a project that did not interact directly with a relational database.
(Awww, those were the days) In every other case, I used database migrations to apply small changes
to a database over time. Using migrations provides an incremental path towards building the current
state of a database. In my opinion it's the only way to do it.

Database migrations are nothing new, and over the years I have come to follow a few best practices:

<!-- more -->

## 1 Migration - 1 Change - 1 Commit

**Each migration should execute a single unit of work on the database.** This comes from the Agile
software development principle of introducing
[small, incremental changes](https://en.wikipedia.org/wiki/Agile_software_development#Iterative.2C_incremental_and_evolutionary).
Small migrations are easier to read and understand.

For example, if I need to create a customers table and accounts table, I would create one migration
to create the customers table and a second migration to create the accounts table. Two migrations.
Two commits.

By keeping each migration contained in its own commit, it is easy for automated build systems to
apply them 1-by-1 in later environments. And if a migration turns out to be malformed, you make it
easy to revert just that change if necessary.

_I always try to commit a migration with no code changes attached._ This isolation ensures that the
migration is fully compatible with the application code both before and after it. Your Database
Administrators will also thank you for making it easier to notice the migration when its all by
itself.

## Never modify a previously committed migration

(This is the one that seems to be unintuitive for less experienced developers.)

Once a commit has left my local machine, it is effectively locked! If I notice afterwards that there
is a typo in a column name or some other mistake, I create another migration that fixes it rather
than modifying the bad one.

Why? Imagine this interaction between 2 developers, Patrick and Molly:

<table>
  <thead>
    <tr>
      <th>Patrick</th>
      <th>Molly</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1. Patrick commits migration #8, which creates a table with a column "product_typ" (misspelled it, oops)</td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td>2. Molly pulls new code and applies migrations, which gives her the new table with the misspelled column name</td>
    </tr>
    <tr>
      <td>3. Patrick realizes his mistake, so he rolls back migration #8 locally, dropping the table. He then modifies the migration to fix the typo, then applies migration #8 again.</td>
      <td></td>
    </tr>
    <tr>
      <td>4. Patrick pushes his changes.</td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td>5. Molly pulls new code and applies migrations again. But this time no change is made to her database because she already applied migration #8 and no new migrations were added. She is stuck with the typo. :(</td>
    </tr>
    <tr>
      <td colspan="2" class="center">6. Patrick's and Molly's database schemas are now out of sync.</td>
    </tr>
  </tbody>
</table>

The only way Molly can fix her database now is to drop it and start over. Depending on the migration
and what was changed, she may not be able to rollback for a quick fix. Want a scarier scenario? What
if Molly was actually the production database.... Oops indeed.

Save yourself the pain. Just don't do it.

## Avoid using your application code (such as models) in migrations

Some migration tools allow you to use application code in your migration files, especially if you
are using the ActiveRecord pattern
[(I’m looking at you Rails)](http://guides.rubyonrails.org/v3.2.8/migrations.html#using-models-in-your-migrations).
The use case for this could be an easy way to do some data manipulation, or inserting seed data.

I avoid doing this because you cannot guarantee that your code will keep the same API forever. Even
the first migration could be run at any point in the future (say a new dev joins and runs them all
for the first time), you can’t assume those same methods could be called. (And I don’t change
previously run migrations)

P.S. Rails 4 no longer even mentions this as an option. The link above from Rails Guides actually
warns against this practice too. :)

## Keep migrations abstract

Try not to use database-specific operations. This couples you to that database technology. Most
migration tools/frameworks attempt to abstract the database away for you, so by using
database-specific concepts or operations, you break that abstraction layer.

However, this rule is often broken since each database speaks its own version of SQL.

## Think about the data

I often see developers overlooking the data stored in their databases. Migrations don’t just effect
the schema, they also effect the stored data - a thats the important part! This happens a lot
because our local development databases may not have very production-like data.

Example: Consider a migration that applies a not null constraint to a column.

<table class="blog-table even">
  <thead>
    <tr>
      <th>Local DB</th>
      <th>Production DB</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
employees
<pre>
id | name       | phone_number
---------------------------
1 | foo         | 5555555555
2 | l33t haxor  | 1234567890
</pre>
      </td>
      <td>
employees
<pre>
id | name   | phone_number
---------------------------
1 | Patrick | 5554567890
2 | Molly   | null
</pre>
      </td>
    </tr>
  </tbody>
</table>

```sql
ALTER TABLE employees MODIFY phone_number VARCHAR(255) NOT NULL;
```

This migration would be fine in development, but that migration would fail in prod. A better
migration would actually be 3 steps:

1. Insert a value into every row where `phone_number` is currently null
2. Add a default value for future inserts (if applicable)
3. Introduce the not null constraint.

Consider changing a column’s data type from a floating point precision to an integer. Maybe you are
converting your money column to be stored as cents so you can avoid floating point mathematical
errors. What would happen to the precision when the migration is applied? Would the database
truncate it? Round it? Something else?

A more pragmatic approach may actually require many steps: introduce another column
`amount_in_cents`; move all the current data to the new column and perform the format change; drop
the `amount` column; finally, rename the `amount_in_cents` column to `amount`.

These are only two scenarios I’ve seen lately, but there are many more.

## Moar

Check out [Database Refactoring](http://databaserefactoring.com/) for a lot of good database
refactoring patterns.
