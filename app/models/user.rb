class User < ApplicationRecord
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
        :omniauthable
  include DeviseTokenAuth::Concerns::User
    has_many :appointments, dependent: :destroy
    has_many :stylists, through: :appointments
end
