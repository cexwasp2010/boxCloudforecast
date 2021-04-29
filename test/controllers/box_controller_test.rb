require 'test_helper'

class BoxControllerTest < ActionDispatch::IntegrationTest
  # Box index should always return a :success
  test "box index" do
    get box_index_url
    assert_response :success
    # Check the response is equal to box element created in fixtures
    assert_template partial: "box/index", locals: {box: @box}
  end

  # TODO: Implement or improve a `box index` to ensure the Boxes are being returned as expected using a mock
  # I adjusted the fixtures to set label as blob field type and decrypt correctly with AWS:SDK:KMS
end
