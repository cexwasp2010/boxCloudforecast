import React, { useState } from "react"
import './css/box_list.css'

/* Component to validate fields in form  */
import { Formik } from "formik";

import PropTypes from "prop-types"

// TODO: Add MouseOver animation using the images for each size; When hovering over the image, the *Open should be visible to our client
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

  const saveBox = () => {
    // TODO: Implement form validation to match the DB schema to help users during the Box creation process

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
      axios.post(`/ajax_post`, {size: size, label: label})
      .then(res => {
        if (res.data.success) {
          window.location.href = '/box'
        } else {
          setError(res.data.error)
        }
      })
    }
  }

  const boxImage = (size) => {
    switch (size) {
      case 'small':
        return SmallBox
      case 'medium':
        return MediumBox
      case 'large':
        return LargeBox
      default:
        return NoSelection
    }
  }

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    if (!label){
      setDisableButton('disable_btn');
    }else{
      setDisableButton('');
    }
  }

  const handleLabel = (e) => {
    setLabel(e.target.value);
    if (size == "no_selection"){
      setDisableButton('disable_btn');
    }else{
      setDisableButton('');
    }
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
                <input type="text" placeholder="Label" onChange={handleLabel} />
                {errorLabel !== '' && (
                  <div key='errorLabel' className='error'>{errorLabel}</div>
                )}
              </div>
            </div>
            <div>
              <button className={`btn btn-outline-primary btn-lg lft-btn ${disableButton}`} onClick={saveBox}>Save</button>
              <button className='btn btn-outline-primary btn-lg' onClick={saveBox}>Cancel</button>

              {error !== '' && (
                <div key='error' className='error'>{error}</div>
              )}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className='boxPreview'>
            <img src={boxImage(size)}/>

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
