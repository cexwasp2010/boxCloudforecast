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
	    def encrypt(text)
      
      # OPTIMIZE change this keyId because I didn't find the required credentials in the README.md
      # keyId = 'arn:aws:kms:us-west-2:941397045302:key/b6ab36fb-9514-46bb-9afe-ce315c92e7f8'
      
      keyId = '0ad31902-4157-49c0-abd6-ca6fb7f35e81'

      client = Aws::KMS::Client.new(
        region: 'us-east-1',
        access_key_id: 'AKIAUB5TTRWAR54B2SRB',
        secret_access_key: "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"
      )

      # client = Aws::KMS::Client.new(region: 'us-west-2')

      resp = client.encrypt({
        key_id: keyId,
        plaintext: text,
      })

      # puts 'Blob:'
      # puts resp.ciphertext_blob.unpack('H*')
      resp.ciphertext_blob.unpack('H*')[0]
    end

    def decrypt(blob)
      blob_packed = [blob].pack("H*")

      client = Aws::KMS::Client.new(region: 'us-west-2')

      resp = client.decrypt({
        ciphertext_blob: blob_packed
      })

      # puts 'Raw text: '
      # puts resp.plaintext
      resp.plaintext
    end
	end
end
