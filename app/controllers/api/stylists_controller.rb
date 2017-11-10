class Api::StylistsController < ApplicationController
    def index
        @stylists = Stylist.all 

        render json: @stylists
    end

    def create
        @stylist = Stylist.new(stylist_params)

        if @stylist.save
            render json: @stylist
        end
    end

    def show
        stylist_id = params[:id]

        @stylist = Stylist.find_by_id(stylist_id)
        render json: @stylist
    end

    def update
        stylist_id = params[:id]
        @stylist = Stylist.find_by_id(stylist_id)

        @stylist.update_attributes(stylist_params)
        render json: @stylist

    end

    def destroy
        stylist_id = params[:id]
        @stylist = Stylist.find_by_id(stylist_id)
        @stylist.destroy

        render json: {
            msg: "successfully deleted"
        }
    end


    private

    def stylist_params
        stylist_params = params.require(:stylist).permit(:name, :email, :password, :rating, :description, :location, :active)
    end
end
