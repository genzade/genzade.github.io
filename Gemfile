# frozen_string_literal: true

source 'https://rubygems.org'

ruby '2.3.6'

gem 'middleman', '~> 4.2'
gem 'middleman-autoprefixer', '~> 2.7'
gem 'middleman-livereload', '~> 3.4.3'
gem 'middleman-sprockets', '~> 4.1', '>= 4.1.1'

# windows does not come with time zone data
gem 'tzinfo-data', platforms: %i[mswin mingw jruby]

# For faster file watcher updates on Windows:
gem 'wdm', '~> 0.1', platforms: %i[mswin mingw]

# slim template because f**k brackets
gem 'slim'

group :test do
  gem 'capybara', '~> 3.1'
  gem 'rspec', '~> 3.7'
end
