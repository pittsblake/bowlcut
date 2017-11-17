class Api::AppointmentsController < ApplicationController

    def index
        @appointments = Appointment.all

        render json: @appointments
    end

    def create
        puts 'route hit'

        @appointment = Appointment.new(appointment_params)
        if @appointment.save!
            render json: @appointment
        end
    end

    def show
        appointment_id = params[:id]

        @appointment = Appointment.find_by_id(appointment_id)
        render json: @appointment, include: [:comments]
    end

    def update
        appointment_id = params[:id]
        @appointment = Appointment.find_by_id(appointment_id)

        @appointment.update_attributes(appointment_params)
        render json: @appointment
    end


    private 
    def appointment_params
        appointment_params = params.require(:appointment).permit( :start_time, :end_time, :finish, :user_id, :stylist_id, :created_at)
    end

end
