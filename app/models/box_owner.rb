require "#{Rails.root}/lib/encryption_wrapper"

class BoxOwner < ApplicationRecord

  validates :first_name, :last_name, :email, presence: true

  include EncryptionWrapper

  # To cast email as Encrypt type
  # If wants check encrypted value in console can run BoxOwner.first.email_before_type_cast
	serialize :email, EncryptionWrapper.new
end
