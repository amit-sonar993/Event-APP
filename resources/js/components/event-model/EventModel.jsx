import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AddEventForm from '../add-event-form/AddEventForm';

const EventModel = ({show, handleClose, children, submitting}) => {

  return (
    <div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button type="submit" variant="primary" form="event-form" disabled={submitting}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default EventModel