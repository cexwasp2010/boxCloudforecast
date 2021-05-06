class BoxController < ApplicationController
  skip_before_action :verify_authenticity_token, :only => [:ajax_post, :ajax_delete, :attach_box_owner, :update]

  def index
    @boxes = Box.all.order(id: :desc)
    @box_owners = BoxOwner.all.order(id: :desc).map {|o| {value: o.id, label: o.email} }
  end

  def new
    
  end

  def create

  end

  def update
    # TODO: Add Box Update logic; Users should only be able to update the label (but not the size)
    # Implement!
    label = params[:label]
    id = params.require(:id)
    begin
      if Box.find(id).update(label: label)
        render json: {success: true}
      end
    rescue Exception => e
      render json: {success: false, error: e.message}
    end
  end

  def show

  end

  def edit

  end

  def destroy

  end

  def attach_box_owner
    box_owner = params[:box_owner]
    id = params[:box].require(:id)
    begin
      if Box.find(id).update(box_owners_id: box_owner)
        render json: {success: true}
      end
    rescue Exception => e
      render json: {success: false, error: e.message}
    end
  end

  def ajax_post
    size = params[:size]
    label = params.require(:label)
    open = params.require(:open)
    if Box.create({size: size, label: label, open: open})
      render json: {success: true}
    else
      render json: {success: false, error: e.message}
    end
  end

  def ajax_delete
    id = params.require(:id)

    if Box.find(id).destroy
      render json: {success: true}
    else
      render json: {success: false}
    end
  end
end
