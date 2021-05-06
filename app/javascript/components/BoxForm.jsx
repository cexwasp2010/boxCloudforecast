import React, { useState } from "react"
import './css/box_list.css'

import PropTypes from "prop-types"

// TODO: Add MouseOver animation using the images for each size; When hovering over the image, the *Open should be visible to our client Implemented!
import SmallBox from './images/box-small.png'
import SmallBoxOpen from './images/box-small-open.png'
import MediumBox from './images/box-medium.png'
import MediumBoxOpen from './images/box-medium-open.png'
import LargeBox from './images/box-large.png'
import LargeBoxOpen from './images/box-large-open.png'
import NoSelection from './images/no-selection.png'

import axios from 'axios';

import './css/index.css'

function BoxForm(props) {
  const [disableButton, setDisableButton] = useState('disable_btn');
  const [size, setSize] = useState(props.size);
  const [label, setLabel] = useState('');
  const [error, setError] = useState('')
  const [errorLabel, setErrorLabel] = useState('')
  const [errorSize, setErrorSize] = useState('')
  const [open, setOpen] = useState(false)

  const saveBox = () => {
    // TODO: Implement form validation to match the DB schema to help users during the Box creation process Implemented!

    /*To check values of label to set error if it isn't valid*/
    if (!label) {
      setErrorLabel("The label is required!");
    } else {
      setErrorLabel("");
    }    
    /*To check values of size to set error if it isn't valid*/
    if (size == "no_selection") {
      setErrorSize("The size is required!");
    } else {
      setErrorSize("");
    }    

    /*To check if the fields don't have any error to permit call post ajax method*/
    if (!(!label || size == "no_selection")) {
      setDisableButton('disable_btn');
      axios.post(`/ajax_post`, {size: size, label: label, open: open})
      .then(res => {
        if (res.data.success) {
          window.location.href = '/box'
        } else {
          setError(res.data.error)
        }
      })
    }
  }

  /*To disable button save if any field is empty*/
  function checkFields(){
    if (!label || size == "no_selection"){
      setDisableButton('disable_btn');
    }else{
      setDisableButton('');
    }
  }
  
  const boxImage = (size) => {
    switch (size) {
      case 'small':
        return open ? SmallBoxOpen : SmallBox;
      case 'medium':
        return open ? MediumBoxOpen : MediumBox;
      case 'large':
        return open ? LargeBoxOpen : LargeBox;
      default:
        return NoSelection
    }
  }

  /*Set open attribute for box*/
  const openCloseImage = () => {
    setOpen(!open)
  }

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    /*Call function that check empty fields*/  
    checkFields();
  }

  const handleLabel = (e) => {
    setLabel(e.target.value);
    /*Call function that check empty fields*/  
    checkFields();
  }

  /*Function that set empty form fields*/  
  const clearBox = (e) => {
    e.preventDefault();
    setDisableButton('disable_btn');
    setLabel("");
    setSize("no_selection");
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-6">
           <h1>New Box</h1>

          <div className='boxForm'>
            <div>
              <div className="label_forms">
                Size:
              </div>
              <div>
                <select value={size} onChange={handleSizeChange}>
                  <option value="no_selection">Select box size</option> 
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
                {errorSize !== '' && (
                  <div key='errorSize' className='error'>{errorSize}</div>
                )}
              </div>
            </div>
            <div>
              <div className="label_forms">
                 Label
              </div>
              <div>
                <input value={label} type="text" placeholder="Label" onChange={handleLabel} />
                {errorLabel !== '' && (
                  <div key='errorLabel' className='error'>{errorLabel}</div>
                )}
              </div>
            </div>
            <div>
              <button className={`btn btn-outline-primary btn-lg lft-btn ${disableButton}`} onClick={saveBox} disabled={disableButton == 'disable_btn'}>Save</button>
              <button className='btn btn-outline-primary btn-lg' onClick={clearBox}>Cancel</button>

              {error !== '' && (
                <div key='error' className='error'>{error}</div>
              )}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div>
            <img src={boxImage(size)} onMouseOver={openCloseImage} />

            {label !== '' && (
              <h4>Preview: {label}</h4>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

BoxForm.propTypes = {
  size: PropTypes.string,
  label: PropTypes.string,
  open: PropTypes.bool
};
export default BoxForm
