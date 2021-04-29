import React, { useState } from "react"
import './css/index.css'

function BoxOwner(props) {
  const [first_name, setFirstName] = useState(props.first_name);
  const [last_name, setLastName] = useState(props.last_name);
  const [email, setEmail] = useState(props.email);

  return (
    <React.Fragment>
      <div className="card">
        <div className='card-content'>
          <h6 className='brown-text'>First Name:</h6>
          <h5>{first_name}</h5>
          <h6 className='brown-text'>Last Name:</h6>
          <h5>{last_name}</h5>
          <h6 className='brown-text'>email:</h6>
          <h5>{email}</h5>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BoxOwner
