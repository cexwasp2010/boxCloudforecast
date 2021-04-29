class AddReferenceToBox < ActiveRecord::Migration[5.0]
  def change
    add_reference :boxes, :box_owners, foreign_key: true
  end
end
