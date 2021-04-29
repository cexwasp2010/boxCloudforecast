class CreateBoxes < ActiveRecord::Migration[5.0]
  def change
    create_table :boxes do |t|
      t.string :size
      t.string :label
      t.boolean :open

      t.timestamps
    end
  end
end
