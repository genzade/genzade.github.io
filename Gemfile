# frozen_string_literal: true

source 'https://rubygems.org'

gem 'http_parser.rb', '~> 0.6.0', platforms: [:jruby]
gem 'jekyll', '~> 4.3.2'
gem 'webrick', '~> 1.8', '>= 1.8.1'

group :jekyll_plugins do
  gem 'jekyll-compose', '~> 0.12.0'
  gem 'jekyll-feed', '~> 0.12'
  gem 'jekyll-postcss', '~> 0.5.0'
  gem 'jekyll-seo-tag', '~> 2.8'
  gem 'jekyll-tagging', '~> 1.1'
  gem 'jekyll-toc', '~> 0.18.0'
end

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem 'tzinfo', '>= 1', '< 3'
  gem 'tzinfo-data'
end
