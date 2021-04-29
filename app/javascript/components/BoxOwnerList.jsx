import React, { useState } from "react"
import PropTypes from "prop-types"
import BoxOwner from "./BoxOwner"
import './css/index.css'

import axios from 'axios';

function BoxOwnerList(props) {

  const [error, setError] = useState('')

  const deleteBoxOwner = (id) => {
    
    axios.delete(`/box_owners/${id}` )
    .then(res => {
      if (res.data.success) {
        window.location.href = '/box_owners'
      } else {
        setError(res.data.error)
      }
    })
  }

  return (
    <React.Fragment>
      <label>
        Total BoxOwners: {props.total}
      </label>
      <div className="row">

        {error !== '' && (
          <div key='error' className='error'>{error}</div>
        )}

        {props.box_owners && (
          props.box_owners.map((box_owner) => (
            <div key={`info-${box_owner.id}`} className='col s12 m4'>
              <BoxOwner key={box_owner.id} first_name={box_owner.first_name} last_name={box_owner.last_name} email={box_owner.email} />

              <div key={`id-${box_owner.id}`}>
                ID: {box_owner.id}
              </div>

              <div  className='center'>
                <button className='btn-large waves-effect waves-light teal lighten-1' key={`delete-${box_owner.id}`} onClick={() => deleteBoxOwner(box_owner.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </React.Fragment>
  );
}

BoxOwnerList.propTypes = {
  box_owners: PropTypes.array,
  total: PropTypes.number
};
export default BoxOwnerList
