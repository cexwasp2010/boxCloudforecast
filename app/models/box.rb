require "#{Rails.root}/lib/encryption_wrapper"

class Box < ApplicationRecord
  belongs_to :box_owner, optional: true
  # TODO: One Box's field is a label; It's currently being stored in plain text and we would like to encrypt it using the AWS KMS SDK
  # See more info here: https://docs.aws.amazon.com/sdk-for-ruby/v3/developer-guide/kms-example-encrypt-data.html
  # You can find the required credentials in the README.md
  # Implemented! With EncryptionWrapper

  validates :label, :size, presence: true

	# To encrypt with  AWS KMS SDK from class EncryptionWrapper in lib/encryption_wrapper.rb
  include EncryptionWrapper

  # To cast label as Encrypt type
  # If wants check encrypted value in console can run Box.first.label_before_type_cast
	serialize :label, EncryptionWrapper.new

end
