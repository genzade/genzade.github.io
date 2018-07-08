# frozen_string_literal: true

require 'rspec'
require 'middleman'
require 'capybara/rspec'

require 'middleman-core'
require 'middleman-core/rack'
require 'middleman-livereload'

middleman_app = ::Middleman::Application.new

Capybara.app = ::Middleman::Rack.new(middleman_app).to_app do
  set :root, File.expand_path(File.join(File.dirname(__FILE__), '..'))
  set :environment, :development
  set :show_exceptions, false
end
