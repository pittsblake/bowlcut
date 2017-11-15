class AddFinishColumnToAppointments < ActiveRecord::Migration[5.1]
  def change
    add_column :appointments, :finish, :boolean
  end
end
