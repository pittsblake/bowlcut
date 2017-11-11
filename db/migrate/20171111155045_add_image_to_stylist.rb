class AddImageToStylist < ActiveRecord::Migration[5.1]
  def change
    add_column :stylists, :image, :string
  end
end
