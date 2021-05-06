# To encrypt Data in AXS KMS
require 'aws-sdk-kms'  # v2: require 'aws-sdk'

# Module that admin encryption of model's fields 
module EncryptionWrapper
 
	class EncryptionWrapper
		def load(value)
	    return if value.nil?
	    decrypt(value)
	  end

	  def dump(value)
	  	encrypt(value)
	  end

	  private
	    def get_client
        # Is necesary create the file config/aws_keys.rb with values of ENV['access_key_id'],
        # ENV['secret_access_key'] and ENV['key_id']
        return Aws::KMS::Client.new(
            access_key_id: ENV['access_key_id'],
            secret_access_key: ENV["secret_access_key"],
            region: 'us-east-1'
          )
      end

      def encrypt(text)
      
      client = get_client

      resp = client.encrypt({key_id: ENV["key_id"], plaintext: text})

      resp.ciphertext_blob.unpack('H*')[0]
    end

    def decrypt(blob)
      blob_packed = [blob].pack("H*")
      
      client = get_client
      
      resp = client.decrypt({
        ciphertext_blob: blob_packed
      })

      resp.plaintext
    end
	end
end
