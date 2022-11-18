import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AddEventModel from '../add-event-model/AddEventModel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, deleteEvents } from '../../store/actions/event';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
function Event() {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const {loading, data: {data: eventData = []} = {}} = useSelector(state => state.eventReducer)

  const handleCloseEventModel = () => {
    setShow(false)
  }

  useEffect(() => {
    dispatch(fetchEvents())
  },[])

  const handleEventDelete = async (id) => {
    const {payload: {status, status_text_code} = {}} = await dispatch(deleteEvents(id))

    if (status == 'success') {
      MySwal.fire(
        'Deleted!',
        'Your event has been deleted.',
        'success'
      )

      /* Refreshing event list*/
      dispatch(fetchEvents())
    } else {
      MySwal.fire(
        '',
        'Ooops something went wrong!',
        'error'
      )
    }    
   
  }

  const handleDeleteConfirm = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }) .then((result) => {
      if (result.isConfirmed) {
        handleEventDelete(id)
      }
    })
  }


  const renderEvents = () => {
    return(
      eventData.map(({id, title, description, start_date, end_date}, index) => {
        return(
            <tr key={index}>
              <td>{index+1}</td>
              <td>{title}</td>
              <td>{description}</td>
              <td>{start_date}</td>
              <td>{end_date}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-secondary">Edit</button>
                  <button type="button" className="btn btn-secondary">Middle</button>
                  <button type="button" className="btn btn-secondary" onClick={()=> handleDeleteConfirm(id)}>Delete</button>
                </div>
              </td>
            </tr>
        )
      })
    )
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
          <Button onClick={() => setShow(true)}>Add Events</Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? <tr><td>Loading ....</td></tr> : renderEvents()}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <AddEventModel show={show} handleClose={handleCloseEventModel}/>
      {/* <SweetAlert2 {...swalProps} /> */}
    </div>
  )
}

export default Event
