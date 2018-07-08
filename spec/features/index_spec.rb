# frozen_string_literal: true

require 'spec_helper'

describe 'index page', type: :feature do
  before { visit '/' }

  it 'responds successfully' do
    expect(page.status_code).to eql(200)
  end

  it 'has a title' do
    expect(page).to have_title('Welcome to Middleman')
  end

  it 'has a heading' do
    expect(page).to have_selector('h1', text: 'Middleman is Running')
  end
end
