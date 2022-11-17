import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AddEventForm from '../add-event-form/AddEventForm';

const AddEventModel = ({show, handleClose}) => {

    console.log(show);
  return (
    <div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddEventForm>
                </AddEventForm>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button type="submit" variant="primary" form="event-form">
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default AddEventModel