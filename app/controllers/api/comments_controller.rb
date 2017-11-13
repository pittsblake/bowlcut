class Api::CommentsController < ApplicationController
    
    def index
        @comments = Comment.all 

        render json: @comments
    end
    
    def create
        @appointment = Appointment.find(params[:appointment_id])
        @comment = @appointment.comments.new(comment_params)

        if @comment.save!
            render json: @comment
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
