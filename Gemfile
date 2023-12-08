# frozen_string_literal: true

source 'https://rubygems.org'

gem 'http_parser.rb', '~> 0.6.0', platforms: [:jruby]
gem 'jekyll', '~> 4.3.2'
gem 'webrick', '~> 1.8', '>= 1.8.1'

group :jekyll_plugins do
  gem 'jekyll-feed', '~> 0.12'
end

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem 'tzinfo', '>= 1', '< 3'
  gem 'tzinfo-data'
end
