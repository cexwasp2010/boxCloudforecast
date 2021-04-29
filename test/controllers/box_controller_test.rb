require 'test_helper'

class BoxControllerTest < ActionDispatch::IntegrationTest
  # Box index should always return a :success
  test "box index" do
    post box_index_url()
    assert_response :success
  end

  # TODO: Implement or improve a `box index` to ensure the Boxes are being returned as expected using a mock
end
