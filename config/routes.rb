Rails.application.routes.draw do
  namespace :api do
    get "/users", to: "users#index", as: "users"
  end
end
