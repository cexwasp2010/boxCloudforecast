import React, { useState } from "react"
import './css/modal.css';

import axios from 'axios';

function Modal(props) {

  const [boxOwner, setBoxOwner] = useState(props.box_owner);
  const [errorBoxOwner, setErrorBoxOwner] = useState('');
  const [errorModal, setErrorModal] = useState('');
  const [disableButton, setDisableButton] = useState('');
  
  const handleBoxOwnerChange = (event) => {
    setBoxOwner(event.target.value);
  }

  /*Function to attach BowOwner to Box*/
  const attachBoxOwner = () => {
    /*To check box_owner is present*/
    if (boxOwner == "no_selection") {
      setErrorBoxOwner("The Bow Owner is required!");
    } else {
      setDisableButton('disable_btn');
      setErrorBoxOwner("");
      axios.post(`/attach_box_owner`, {box_owner: boxOwner, id: props.box_id})
      .then(res => {
        if (res.data.success) {
          window.location.href = '/box'
        } else {
          errorModal(res.data.error)
        }
      })
    }
  }

  return (
    <React.Fragment>
      <h6>
        Select Box Owner:
      </h6>
      <div className="input-field">
        <select value={boxOwner} onChange={handleBoxOwnerChange}>
          <option value="no_selection">Select box owner</option>
          {props.box_owners && (
            props.box_owners.map((box_owner) => (
              <option key={box_owner.value} value={box_owner.value}>{box_owner.label}</option>
            ))
          )}
        </select>
        {errorBoxOwner !== '' && (
          <div key='errorBoxOwner' className='error'>{errorBoxOwner}</div>
        )}
        {errorModal !== '' && (
          <div key='errorModal' className='error'>{errorModal}</div>
        )}
        <div>
          <button className={`btn btn-primary btn-md ${disableButton}`} type="button" onClick={attachBoxOwner} disabled={disableButton == 'disable_btn'}>Atthach</button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Modal