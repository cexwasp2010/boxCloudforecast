import React, { useState } from "react"
import PropTypes from "prop-types"
import './css/index.css'
import './css/box_list.css'

import SmallBox from './images/box-small.png'
import MediumBox from './images/box-medium.png'
import LargeBox from './images/box-large.png'
import Delete from './images/delete.png'

import axios from 'axios';

function BoxList(props) {
  
  const [error, setError] = useState('')

  const boxImage = (size) => {
    
    switch (size) {
      case 'small':
        return SmallBox
      case 'medium':
        return MediumBox
      case 'large':
        return LargeBox
    }
  }

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
      <div className="row">
        <div className="col-6">
          <h1>Boxes</h1>

          <label>
            Total Boxes: {props.total}
          </label>
          {error !== '' && (
            <div key='error' className='error'>{error}</div>
          )}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Preview</th>
                <th scope="col">Label</th>
                <th scope="col">Size</th>
                <th scope="col">ID</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {props.boxes && (
                props.boxes.map((box) => (
                  <tr key={`id-${box.id}`}>
                    <td>
                      <img src={boxImage(box.size)} width="32px" height="32px" />
                    </td>

                    <td>
                      {box.label}
                    </td>

                    <td>
                      {box.size}
                    </td>
                    
                    <td>
                      {box.id}
                    </td>

                    <th scope="row">
                      <img src={Delete} alt="Delete image" />
                    </th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="col-6">
          <a href="/box/new" type="button" className="float-right btn btn-primary btn-md">
            New Box
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

BoxList.propTypes = {
  boxes: PropTypes.array,
  total: PropTypes.number
};
export default BoxList
