class Api::CommentsController < ApplicationController
    
    def index
        @comments = Comment.all 

        render json: @comments
    end
    
    def create

        #find the appointment id
        @appointment = Appointment.find(params[:appointment_id])
        #create a new comment within the appointment
        @comment = @appointment.comments.new(comment_params)

        if @comment.save!
            render json: @appointment.comments
        end
    end

    def show
        comment_id = params[:id]

        @comment = Comment.find_by_id(comment_id)
        render json: @comment
    end

    private
    def comment_params
        comment_params = params.require(:comment).permit(
            :description
        )
    end

end
