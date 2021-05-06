# Load the Rails application.
require_relative 'application'

aws_keys = File.join(Rails.root, 'config', 'aws_keys.rb')
load(aws_keys) if File.exist?(aws_keys)

# Initialize the Rails application.
Rails.application.initialize!