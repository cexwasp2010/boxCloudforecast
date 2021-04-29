Rails.application.routes.draw do
  resources :box_owners
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'

  post 'ajax_post', to: 'box#ajax_post'
  post 'attach_box_owner', to: 'box#attach_box_owner'
  delete 'ajax_delete', to: 'box#ajax_delete'

  resources :box
end
