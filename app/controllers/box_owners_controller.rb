class BoxOwnersController < ApplicationController
  skip_before_action :verify_authenticity_token, :only => [:create, :destroy]
  
  before_action :set_box_owner, only: %i[ show edit update destroy ]

  # GET /box_owners or /box_owners.json
  def index
    @box_owners = BoxOwner.all.order(id: :desc)
  end

  # GET /box_owners/1 or /box_owners/1.json
  def show
  end

  # GET /box_owners/new
  def new
  end

  # GET /box_owners/1/edit
  def edit
  end

  # POST /box_owners or /box_owners.json
  def create
    @box_owner = BoxOwner.new(box_owner_params)

    if @box_owner.save!
      render json: {success: true}
    else
      render json: {success: false, error: e.message}
    end
  end

  # PATCH/PUT /box_owners/1 or /box_owners/1.json
  def update
    
  end

  # DELETE /box_owners/1 or /box_owners/1.json
  def destroy
    if @box_owner.destroy
      render json: {success: true}
    else
      render json: {success: false}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_box_owner
      @box_owner = BoxOwner.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def box_owner_params
      params.require(:box_owner).permit(:first_name, :last_name, :email, :box_id)
    end
end
