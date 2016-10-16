desc 'Serve locally'
task :serve do
  sh 'jekyll serve'
end

desc 'Deploy'
task :deploy do
  sh 'jekyll build'

  # From: http://www.damian.oquanta.info/posts/one-line-deployment-of-your-site-to-gh-pages.html
  sh 'git subtree split --prefix=_site -b deploy'
  sh 'git push -f origin deploy:master'
  sh 'git branch -D deploy'
end
