import React, { useState } from "react"
import './css/box_list.css'

/* Component to validate fields in form  */
import { Formik } from "formik";

import PropTypes from "prop-types"

import axios from 'axios';

import './css/index.css'

function BoxOwnerForm(props) {
  const [disableButton, setDisableButton] = useState('disable_btn');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('')
  const [errorFirstName, setErrorFirstName] = useState('')
  const [errorLastName, setErrorLastName] = useState('')
  const [error, setError] = useState('')

  const saveBoxOwner = () => {
    
    /*To check values of first_name to set error if it isn't valid*/
    if (!first_name) {
      setErrorFirstName("The First Name is required!");
    } else {
      setErrorFirstName("");
    }    

    /*To check values of last_name to set error if it isn't valid*/
    if (!last_name) {
      setErrorLastName("The Last Name is required!");
    } else {
      setErrorLastName("");
    }    

    /*To check values of email to set error if it isn't valid*/
    let fail_email = true;
    if (!email) {
      setErrorEmail("The Email is required!");
    } else if(!(/^\S+@\S+$/.test(email))) {
      setErrorEmail("The Email format isn't correct!");
    } else {
      fail_email = false;
      setErrorEmail("");
    }    
    /*To check if the fields don't have any error to permit call post ajax method*/
    if (!(!first_name || !last_name || fail_email)) {
      setDisableButton('disable_btn');
      axios.post(`/box_owners`, {first_name: first_name, last_name: last_name, email: email})
      .then(res => {
        if (res.data.success) {
          window.location.href = '/box_owners'
        } else {
          setError(res.data.error)
        }
      })
    }
  }
  
  /*To disable button save if any field is empty*/
  function checkFields(){
    if (!first_name || !last_name || !email){
      setDisableButton('disable_btn');
    }else{
      setDisableButton('');
    }
  }
  
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    /*Call function that check empty fields*/  
    checkFields();
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    /*Call function that check empty fields*/  
    checkFields();
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!(/^\S+@\S+$/.test(event.target.value))) {
      setErrorEmail("The Email format isn't correct!");
    } else {
      setErrorEmail("");
      /*Call function that check empty fields*/  
      checkFields();
    } 
  }

  /*Function that set empty form fields*/  
  const clearBoxOwner = (event) => {
    setDisableButton('disable_btn');
    setFirstName("");
    setLastName("");
    setEmail("");
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-6">
          <h1>New Box Owner</h1>

          <div className='boxOwnerForm'>
            <div>
              <div className="label_forms">
                First Name:
              </div>
              <div>
                <input value={first_name} type="text" placeholder="First Name" value={first_name} onChange={handleFirstNameChange} />
                {errorFirstName !== '' && (
                  <div key='errorFirstName' className='error'>{errorFirstName}</div>
                )}
              </div>
            </div>
            <div>
              <div className="label_forms">
                Last Name:
              </div>
              <div>
                <input value={last_name} type="text" placeholder="Last Name" onChange={handleLastNameChange} />
                {errorLastName !== '' && (
                  <div key='errorLastName' className='error'>{errorLastName}</div>
                )}
              </div>
            </div>
            <div>
              <div className="label_forms">
                Email:
              </div>
              <div>
                <input value={email} type="text" placeholder="Email" onChange={handleEmailChange} />
                {errorEmail !== '' && (
                  <div key='errorEmail' className='error'>{errorEmail}</div>
                )}
              </div>
            </div>
            <div>
              <button className={`btn btn-outline-primary btn-lg lft-btn ${disableButton}`} onClick={saveBoxOwner} disabled={disableButton == 'disable_btn'}>Save</button>
              <button className='btn btn-outline-primary btn-lg' onClick={clearBoxOwner}>Cancel</button>

              {error !== '' && (
                <div key='error' className='error'>{error}</div>
              )}
            </div>
          </div>
        </div>
        <div className="col-6">
          <h4>
            {first_name !== '' && (
              <span>Your data: {first_name} </span>
            )}
            {last_name !== '' && (
              <span>{last_name}. </span>
            )}
            {email !== '' && (
              <span>Email: {email}</span>
            )}
          </h4>
        </div>
      </div>
    </React.Fragment>
  );
}

BoxOwnerForm.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string
};
export default BoxOwnerForm
