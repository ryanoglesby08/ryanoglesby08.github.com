desc 'Serve locally'
task :serve do
  sh 'jekyll serve'
end

desc 'Deploy'
task :deploy do
  sh 'jekyll build'
  sh 'git add -f _site && git commit -m "Deploy"'
  sh 'git subtree push --prefix _site origin master'
end
