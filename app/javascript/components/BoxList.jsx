import React, { useState } from "react"
import PropTypes from "prop-types"
import Modal from "./Modal"
import EditModal from "./EditModal"
import './css/index.css'
import './css/box_list.css'

import SmallBox from './images/box-small.png'
import SmallBoxOpen from './images/box-small-open.png'
import MediumBox from './images/box-medium.png'
import MediumBoxOpen from './images/box-medium-open.png'
import LargeBox from './images/box-large.png'
import LargeBoxOpen from './images/box-large-open.png'
import Delete from './images/delete.png'
import Edit from './images/edit.png'

import axios from 'axios';

function BoxList(props) {
  
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)
  const [boxId, setBoxId] = useState('')
  const [boxOwner, setBoxOwner] = useState('no_selection')
  const [label, setLabel] = useState('')

  const boxImage = (size, open) => {
    
    switch (size) {
       case 'small':
        return open ? SmallBoxOpen : SmallBox;
      case 'medium':
        return  open ? MediumBoxOpen : MediumBox;
      case 'large':
        return  open ? LargeBoxOpen : LargeBox;
    }
  }

  const deleteBox = (id) => {
    axios.delete(`/ajax_delete`, {data: {id}})
    .then(res => {
      if (res.data.success) {
        window.location.href = '/box'
      } else {
        // TODO: Handle error and display message to the user Implemented!
        setError(res.data.error)
      }
    })
  }

  const showModal = (b_id, b_o) => {
    setBoxId(b_id);
    /*Check if box_owner_ids is or not null to set default value*/
    if(b_o){
      setBoxOwner(b_o);
    }else{
      setBoxOwner('no_selection');
    }
    setShow(true);
  }

  const hideModal = () => {
    setBoxId('');
    setBoxOwner('no_selection');
    setShow(false);
    setLabel('');
  }

  const showEditModal = (b_id,b_l) => {
    setBoxId(b_id);
    setLabel(b_l);
    setShow(true);
  }

  return (
    <React.Fragment>
      <div key='modal-box' className="row">
        <div className={`modal display-block ${show ? "display-block" : "display-none"}`}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 style={{display: !label ? 'block' : 'none' }} className="modal-title">Attach Box Owner to Box</h5>
                <h5 style={{display: label ? 'block' : 'none' }} className="modal-title">Updatre Box's label</h5>
                <button type="button" className="close" onClick={hideModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div style={{display: !label ? 'block' : 'none' }}>
                  <Modal key={boxId} box_owners={props.box_owners} box_owner={boxOwner} box_id={boxId} />
                </div>
                <div style={{display: label ? 'block' : 'none' }}>
                  <EditModal key={`modal-${boxId}`} label={label} box_id={boxId} />
                </div>
              </div>
              <div className="modal-footer">
                <button className='btn btn-secondary btn-sm float-right' type="button" onClick={hideModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
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
                      {/* When click on this show modal to attach Box Owner */}
                      <img src={boxImage(box.size, box.open)} width="32px" height="32px" onClick={() => showModal(box.id, box.box_owners_id)}  />
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
                      <img src={Edit} alt="Edit image" width="14px" height="18px" onClick={() => showEditModal(box.id, box.label)} />
                    </th>

                    <th scope="row">
                      <img src={Delete} alt="Delete image" onClick={() => deleteBox(box.id)} />
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
