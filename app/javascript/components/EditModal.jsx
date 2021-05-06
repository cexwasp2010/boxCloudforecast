import React, { useState } from "react"
import './css/modal.css';

import axios from 'axios';

function EditModal(props) {

  const [label, setLabel] = useState(props.label);
  const [errorLabel, setErrorLabel] = useState('');
  const [errorModal, setErrorModal] = useState('');
  const [disableButton, setDisableButton] = useState('disable_btn');
  
  const handleBoxOwnerChange = (event) => {
    setLabel(event.target.value);
  }

  /*Function to update Label of Box*/
  const updateLabel = () => {
    /*To check label isn't empty*/
    if (!label) {
      setErrorLabel("The Label is required!");
    } else {
      setDisableButton('disable_btn');
      setErrorLabel("");
      axios.put(`/box/${props.box_id}`, {label: label})
      .then(res => {
        if (res.data.success) {
          window.location.href = '/box'
        } else {
          errorModal(res.data.error)
        }
      })
    }
  }
  
  const handleLabel = (e) => {
    setLabel(e.target.value);
    if(!e.target.value){
      setDisableButton('disable_btn');
    }else{
      setDisableButton('');
    }
  }

  return (
    <React.Fragment>
      <h6>
        Label:
      </h6>
      <div className="input-field">
        <input value={label} type="text" placeholder="Label" onChange={handleLabel} />
        {errorLabel !== '' && (
          <div key='errorLabel' className='error'>{errorLabel}</div>
        )}
        {errorModal !== '' && (
          <div key='errorModal' className='error'>{errorModal}</div>
        )}
        <div>
          <button className={`btn btn-primary btn-md ${disableButton}`} type="button" onClick={updateLabel} disabled={disableButton == 'disable_btn'}>Save</button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditModal