class DeviseTokenAuthCreateUsers < ActiveRecord::Migration[5.1]
  def up
    add_column :users, :provider, :string, null: false, default: 'email'
    add_column :users, :uid, :string, null: false, default: ''
    add_column :users, :tokens, :text
    add_column :users, :encrypted_password, :string, :null => false, :default => ""
    add_column :users, :reset_password_token, :string
    add_column :users, :reset_password_sent_at, :datetime
    add_column :users, :remember_created_at, :datetime
    add_column :users, :sign_in_count, :integer, :default => 0, :null => false
    add_column :users, :current_sign_in_at, :datetime
    add_column :users, :last_sign_in_at, :datetime
    add_column :users, :current_sign_in_ip, :string
    add_column :users, :last_sign_in_ip, :string

    User.reset_column_information
    User.find_each do |user|
      user.uid = user.email
      user.provider = 'email'
      user.save!
    end

    add_index :users, [:uid, :provider], unique: true
  end

  def down
    remove_columns :users, :provider, :uid, :tokens
    remove_index :users, name: :index_users_on_uid_and_provider
  end



  # def change
  #   create_table(:users) do |t|

  #     ## Database authenticatable
  #     # t.string :encrypted_password, :null => false, :default => ""

  #     ## Recoverable
  #     # t.string   :reset_password_token
  #     # t.datetime :reset_password_sent_at

  #     ## Rememberable
  #     # t.datetime :remember_created_at

  #     ## Trackable
  #     # t.integer  :sign_in_count, :default => 0, :null => false
  #     # t.datetime :current_sign_in_at
  #     # t.datetime :last_sign_in_at
  #     # t.string   :current_sign_in_ip
  #     # t.string   :last_sign_in_ip

  #   end

  #   add_index :users, :email,                unique: true
  #   add_index :users, [:uid, :provider],     unique: true
  #   add_index :users, :reset_password_token, unique: true
  #   add_index :users, :confirmation_token,   unique: true
  #   # add_index :users, :unlock_token,       unique: true
  # end
end
