import React, { useState } from "react"
import './css/index.css'

import SmallBox from './images/box-small.png'
import MediumBox from './images/box-medium.png'
import LargeBox from './images/box-large.png'

import axios from 'axios';

function Box(props) {
  const [size, setSize] = useState(props.size);
  const [label, setLabel] = useState(props.label);
  const [boxOwner, setBoxOwner] = useState(props.box_owner);
  const [errorBoxOwner, setErrorBoxOwner] = useState('')
  
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
      <div className="card show_item">
        <div className='card-image'>
          <img src={boxImage(size)} />
        </div>
        <div className='card-content'>
          <h6><span className='brown-text'>Label: </span>{label}</h6>
          <h6><span className='brown-text'>Size: </span>{size}</h6>
          <h6>
            Attach Box Owner:
          </h6>
          <div className="input-field">
            <select value={boxOwner} onChange={handleBoxOwnerChange}>
              <option value="no_selection"></option>
              {props.box_owners && (
                props.box_owners.map((box_owner) => (
                  <option key={box_owner.value} value={box_owner.value}>{box_owner.label}</option>
                ))
              )}
            </select>
            {errorBoxOwner !== '' && (
              <div key='errorBoxOwner' className='error'>{errorBoxOwner}</div>
            )}
            <div>
              <button className='btn-small waves-effect waves-light brown lighten-1' onClick={attachBoxOwner}>Atthach box owner</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Box
