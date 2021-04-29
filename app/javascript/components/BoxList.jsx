import React, { useState } from "react"
import PropTypes from "prop-types"
import Box from "./Box"
import './css/index.css'

import axios from 'axios';

function BoxList(props) {

  const [error, setError] = useState('')

  const deleteBox = (id) => {
    console.log('delete box: ' + id)
    
    axios.delete(`/ajax_delete`, {data: {id}})
    .then(res => {
      if (res.data.success) {
        window.location.href = '/box'
      } else {
        // TODO: Handle error and display message to the user
        setError(res.data.error)
      }
    })
  }

  return (
    <React.Fragment>
      <label>
        Total Boxes: {props.total}
      </label>
      <div className="row">

        {error !== '' && (
          <div key='error' className='error'>{error}</div>
        )}

        {props.boxes && (
          props.boxes.map((box) => (
            <div key={`info-${box.id}`} className='col s12 m4'>
              <Box key={box.id} size={box.size} label={box.label} box_owner={box.box_owners_id} box_owners={props.box_owners} box_id={box.id} />

              <div key={`id-${box.id}`}>
                ID: {box.id}
              </div>

              <div className='center'>
                <button className='btn-large waves-effect waves-light teal lighten-1' key={`delete-${box.id}`} onClick={() => deleteBox(box.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
        </div>
    </React.Fragment>
  );
}

BoxList.propTypes = {
  boxes: PropTypes.array,
  total: PropTypes.number
};
export default BoxList
