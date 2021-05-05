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
        # client = Aws::KMS::Client.new(region: 'us-west-2')
        return Aws::KMS::Client.new(
            access_key_id: "AKIAUB5TTRWAR54B2SRB",
            secret_access_key: "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",
            region: 'us-east-1'
          )
      end

      def encrypt(text)
      
      # client = Aws::KMS::Client.new(region: 'us-west-2')
      client = get_client

      resp = client.encrypt({key_id: "0ad31902-4157-49c0-abd6-ca6fb7f35e81", plaintext: text})

      resp.ciphertext_blob.unpack('H*')[0]
    end

    def decrypt(blob)
      blob_packed = [blob].pack("H*")
      
      # client = Aws::KMS::Client.new(region: 'us-west-2')
      client = get_client
      
      resp = client.decrypt({
        ciphertext_blob: blob_packed
      })

      resp.plaintext
    end
	end
end
