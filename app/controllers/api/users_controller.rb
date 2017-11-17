class Api::UsersController < ApplicationController
    def index
        @users = User.all

        render json: @users
    end

    def create
        # whitelist params and save them to a variable
            #See private section
        
        # create a new creature from `creature_params`
        @user = User.new(user_params)
        # if creature saves, render the new creature in JSON
        if @user.save
            render json: @user
        end
    end

    def show 
        #get the user id from the url params
        user_id = params[:id]
        #use the 'user_id' to find the user in the database
        #and save it to an instance variable

        # give me the user, and the info for each appointment 

        @user = User
            .left_joins(:appointments => :stylist)
            .includes(:appointments)
            .includes(:stylists)
            .find(user_id)

        user_response = {
            user: @user,
            appointments: @user.appointments.map do |appointment|
                {
                    created_at: appointment.created_at,
                    stylist_name: appointment.stylist.name
                }
            end
        }

        render json: user_response
    end

    def update
        user_id = params[:id]
        @user = User.find_by_id(user_id)

        @user.update_attributes(user_params)
        render json: @user
    end

    def destroy
        user_id = params[:id]
        @user = User.find_by_id(user_id)

        @user.destroy
        render json: {
            msg: "Successfully Deleted"
        }
    end

    private
    # Whitelist params 
    def user_params
        user_params = params.require(:user).permit(:name, :email, :password, :rating, :image)
    end
end
