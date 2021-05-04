import React, { useState } from "react"
import './css/index.css'
import './css/home.css'

import SmallBox from './images/box-small.png'
import MediumBox from './images/box-medium.png'
import LargeBox from './images/box-large.png'

import axios from 'axios';

function BoxHome(props) {
  const [label, setLabel] = useState(props.label);
  
  const boxId = props.box_id

  const boxImage = (size) => {
    
    switch (size) {
      case 'small':
        return SmallBox
      case 'medium':
        return MediumBox
      case 'large':
        return LargeBox
    }
  }

  const handleBoxOwnerChange = (event) => {
    setBoxOwner(event.target.value);
  }

  /*Function to attach BowOwner to Box*/
  const attachBoxOwner = () => {

    /*To check box_owner is present*/
    if (!boxOwner) {
      setErrorBoxOwner("The Bow Owner is required!");
    } else {
      setErrorBoxOwner("");
      axios.post(`/attach_box_owner`, {box_owner: boxOwner, id: props.box_id})
      .then(res => {
        if (res.data.success) {
          window.location.href = '/box'
        } else {
          setErrorBoxOwner(res.data.error)
        }
      })
    }
  }

  return (
    <React.Fragment>
	    <div className="auxiliar_section home">
				<div className="feature_home">
					<h1>{label}</h1>
				</div>
				<div className="complement_text">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
				</div>
				<div className="container_btn">
					<button  type="button" className="btn btn-primary btn-lg">
						My boxes
					</button>
				</div>
			</div>
	    <div className="container">
		    <div className="row">
			    <div className="col">
			      <div className="card">
		          <img className="card-img-top" src={SmallBox} alt="Small Box image cap" />
						  <div className="card-body text-center">
						    <h5 className="card-title">Small box</h5>
						    <p className="card-text">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.</p>
						  </div>
						</div>
	        </div>
			    <div className="col">
			       <div className="card">
		          <img className="card-img-top" src={MediumBox} alt="Medium Box image cap" />
						  <div className="card-body text-center">
						    <h5 className="card-title">Medium box</h5>
						    <p className="card-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
						  </div>
						</div>
			    </div>
			    <div className="col">
			     <div className="card">
		          <img className="card-img-top" src={LargeBox} alt="Large Box image cap" />
						  <div className="card-body text-center">
						    <h5 className="card-title">Large box</h5>
						    <p className="card-text">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</p>
						  </div>
						</div>
			    </div>
			  </div>
			</div>
    </React.Fragment>
  );
}

export default BoxHome
