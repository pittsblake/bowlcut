class Appointment < ApplicationRecord
  belongs_to :stylist
  belongs_to :user
  has_many :comments, dependent: :destroy
end
