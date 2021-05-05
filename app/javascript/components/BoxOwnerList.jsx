import React, { useState } from "react"
import PropTypes from "prop-types"
import BoxOwner from "./BoxOwner"
import './css/index.css'
import './css/box_list.css'

import Delete from './images/delete.png'

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
      <div className="row">
        <div className="col-6">

          <h1>Box Owners</h1>

          <label>
            Total BoxOwners: {props.total}
          </label>

          {error !== '' && (
            <div key='error' className='error'>{error}</div>
          )}

          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">email</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {props.box_owners && (
                props.box_owners.map((box_owner) => (
                  <tr key={`id-${box_owner.id}`}>
                    <td>
                      {box_owner.id}
                    </td>

                    <td>
                      {box_owner.first_name}
                    </td>

                    <td>
                      {box_owner.last_name}
                    </td>
                    
                    <td>
                      {box_owner.email}
                    </td>

                    <th scope="row">
                      <img src={Delete} alt="Delete image" onClick={() => deleteBoxOwner(box_owner.id)} />
                    </th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="col-6">
          <a href="/box_owners/new" type="button" className="float-right btn btn-primary btn-md">
            New BoxOwner
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

BoxOwnerList.propTypes = {
  box_owners: PropTypes.array,
  total: PropTypes.number
};
export default BoxOwnerList
