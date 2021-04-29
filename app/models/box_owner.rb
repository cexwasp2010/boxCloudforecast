require "#{Rails.root}/lib/encryption_wrapper"

class BoxOwner < ApplicationRecord

  validates :first_name, :last_name, :email, presence: true
  #TODO add validates to email regex or in the react component
  include EncryptionWrapper

  # To cast email as Encrypt type
  # If wants check encrypted value in console can run BoxOwner.first.email_before_type_cast
	serialize :email, EncryptionWrapper.new
end
