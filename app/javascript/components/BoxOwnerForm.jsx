import React, { useState } from "react"

/* Component to validate fields in form  */
import { Formik } from "formik";

import PropTypes from "prop-types"

import axios from 'axios';

import './css/index.css'

function BoxOwnerForm(props) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('')
  const [errorFirstName, setErrorFirstName] = useState('')
  const [errorLastName, setErrorLastName] = useState('')

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
  
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  }
  
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!(/^\S+@\S+$/.test(event.target.value))) {
      setErrorEmail("The Email format isn't correct!");
    } else {
      setErrorEmail("");
    } 
  }

  return (
    <React.Fragment>
      <h3>Set Your Box Owner</h3>

      <div className='boxOwnerForm'>
        <div>
          <div>
            Step 1: First Name:
          </div>
          <div>
            <input type="text" placeholder="First Name" value={first_name} onChange={handleFirstNameChange} />
            {errorFirstName !== '' && (
              <div key='errorFirstName' className='error'>{errorFirstName}</div>
            )}
          </div>
        </div>
        <div>
          <div>
            Step 2: Last Name:
          </div>
          <div>
            <input type="text" placeholder="Last Name" onChange={handleLastNameChange} />
            {errorLastName !== '' && (
              <div key='errorLastName' className='error'>{errorLastName}</div>
            )}
          </div>
        </div>
        <div>
          <div>
            Step 3: Email:
          </div>
          <div>
            <input type="text" placeholder="Email" onChange={handleEmailChange} />
            {errorEmail !== '' && (
              <div key='errorEmail' className='error'>{errorEmail}</div>
            )}
          </div>
        </div>
        <div className='boxPreview'>
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
        <div>
          <button className='btn-large waves-effect waves-light teal lighten-1' onClick={saveBoxOwner}>Save as new box owner</button>
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
