require 'test_helper'

class BoxOwnersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @box_owner = box_owners(:one)
  end

  test "should get index" do
    get box_owners_url
    assert_response :success
  end

  test "should get new" do
    get new_box_owner_url
    assert_response :success
  end

  test "should create box_owner" do
    assert_difference('BoxOwner.count') do
      post box_owners_url, params: { box_owner: { email: @box_owner.email, first_name: @box_owner.first_name, last_name: @box_owner.last_name } }
    end

    assert status === 200 
  end

  test "should show box_owner" do
    get box_owner_url(@box_owner)
    assert_response :success
  end

  test "should destroy box_owner" do
    assert_difference('BoxOwner.count', -1) do
      delete box_owner_url(@box_owner)
    end

    assert status === 200 
  end
end
