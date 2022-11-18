import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EventModel from '../event-model/EventModel';
import { useDispatch, useSelector } from 'react-redux';
import { createEvents, updateEvents, fetchEvents, deleteEvents } from '../../store/actions/event';
import EventForm from '../event-form/EventForm';
import { format } from 'date-fns'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import Select from 'react-select';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const options = [
  { value: 'all', label: 'All'},
  { value: 'finished_events', label: 'Finished events' },
  { value: 'upcoming_events', label: ' Upcoming events' },
  { value: 'upcoming_7_days_events', label: 'Upcoming events within 7 days' },
  { value: 'last_7_days_finished_events', label: 'Finished events of the last 7 days'}
];

function Event() {
  const [eventAddSubmittng, setEventAddSubmittng] = useState(false)
  const [showEventAddModel, setShowEventAddModel] = useState(false)
  const [showEventEditModel, setShowEventEditModel] = useState(false)
  const [eventEditData, setEventEditData] = useState({})
  const [eventUpdateSubmittng, setEventUpdateSubmittng] = useState(false)
  const [selectedFilterOption, setSelectedFilterOption] = useState({ value: 'all', label: 'All'});
  const dispatch = useDispatch()
  const {loading, data: eventData = []} = useSelector(state => state.eventReducer)

  const handleCloseEventAddModel = () => {
    setShowEventAddModel(false)
  }


  useEffect(() => {
    console.log('selectedFilterOption', selectedFilterOption);
    fetchEventList()
  },[selectedFilterOption])


  /* Event list */
  const fetchEventList = () => {
    dispatch(fetchEvents(selectedFilterOption))
  }


  /* Event delete */
  const handleEventDelete = async (id) => {
    const {payload: {status, status_text_code} = {}} = await dispatch(deleteEvents(id))

    if (status == 'success') {
      MySwal.fire(
        'Deleted!',
        'Your event has been deleted.',
        'success'
      )

      /* Refreshing event list*/
      fetchEventList()
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


  /* Event store */
  const handleEventAddSubmit = async (data) => {
    let startDate = format(new Date(data['start_date']), 'yyyy-MM-dd')
    let endDate = format(new Date(data['end_date']), 'yyyy-MM-dd')
    data['start_date'] = startDate
    data['end_date'] = endDate

    setEventAddSubmittng(true)
    let {payload} = await dispatch(createEvents(data))

    if (payload && payload.status) {
      setEventAddSubmittng(false)
      
      if (payload.status == 'success') {
        fetchEventList()
        handleCloseEventAddModel()
        
        toast.success('Events added successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
      }
      
    }    
  }

  /* Event edit */
  const handleCloseEventEditModel = () => {
    setShowEventEditModel(false)
  }

  const handleShowEventEditModel = (id) => {
    let event = eventData.filter((event) => event.id == id).shift()

    if (event) {
      let startDate = new Date(event.start_date)
      let endDate = new Date(event.end_date)

      setEventEditData({...event, start_date: startDate, end_date: endDate})

      setShowEventEditModel(true)
    }
  }

  const handleEventUpdateSubmit = async (data) => {
    console.log('update data', data)

    let startDate = format(new Date(data['start_date']), 'yyyy-MM-dd')
    let endDate = format(new Date(data['end_date']), 'yyyy-MM-dd')
    data['start_date'] = startDate
    data['end_date'] = endDate

    setEventUpdateSubmittng(true)
    let {payload} = await dispatch(updateEvents(data))
    setEventUpdateSubmittng(false)

    if (payload && payload.status) {
      setEventAddSubmittng(false)
      
      if (payload.status == 'success') {
        fetchEventList()
        handleCloseEventEditModel()
        toast.success('Events updated successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
      }
      
    }   
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
                  <button 
                    type="button" 
                    className="btn btn-secondary ml-5"
                    onClick={() => { handleShowEventEditModel(id) }}
                  >
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger" onClick={()=> handleDeleteConfirm(id)}>Delete</button>
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
        <Row className="justify-content-end">
          <Col className="col-2">
            <Select
                defaultValue={selectedFilterOption}
                onChange={setSelectedFilterOption}
                options={options}
              />
          </Col>
          <Col className="col-2">
            <Button onClick={() => setShowEventAddModel(true)}>Add Events</Button>
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
      <EventModel name="Create Events" show={showEventAddModel} handleClose={handleCloseEventAddModel} submitting={eventAddSubmittng}>
        <EventForm
                    onSubmit={handleEventAddSubmit}
                />
      </EventModel>

      <EventModel name="Edit Event" show={showEventEditModel} handleClose={handleCloseEventEditModel} submitting={eventUpdateSubmittng}>
        <EventForm
          data={eventEditData}
          onSubmit={handleEventUpdateSubmit}
        />
      </EventModel>
      
    </div>
  )
}

export default Event
