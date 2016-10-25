desc 'Serve locally'
task :serve do
  sh 'jekyll serve'
end

desc 'Push source'
task :push do
  sh 'git push origin source'
end

desc 'Deploy'
task :deploy do
  sh 'jekyll build && octopress deploy'
end
