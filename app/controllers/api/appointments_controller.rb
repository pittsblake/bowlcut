class Api::AppointmentsController < ApplicationController
    def create
        puts 'route hit'

        @appointment = Appointment.new(appointment_params)

        if @appointment.save
            render json: @appointment
        end
    end

    private 
    def appointment_params
        appointment_params = params.require(:appointment).permit( :start_time, :end_time, :user_id, :stylist_id )
    end
end
