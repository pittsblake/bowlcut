class CreateStylists < ActiveRecord::Migration[5.1]
  def change
    create_table :stylists do |t|
      t.string :name
      t.string :email
      t.string :password
      t.integer :rating
      t.string :description
      t.string :location
      t.boolean :active

      t.timestamps
    end
  end
end
