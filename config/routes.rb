Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api do
    # Users 
    get "/users", to: "users#index", as: "users"
    post "/users", to: "users#create"
    get "/users/:id", to: "users#show", as: "user"
    patch "users/:id", to: "users#update"
    delete "/users/:id", to: "users#destroy"

    # Stylists
    get "/stylists", to: "stylists#index", as: "stylists"
    post "/stylists", to: "stylists#create"
    get "/stylists/:id", to: "stylists#show", as: "stylist"
    patch "/stylists/:id", to: "stylists#update"
    delete "/stylists/:id", to: "stylists#destroy"

    resources :appointments do
      resources :comments
    end
    
  end
end
