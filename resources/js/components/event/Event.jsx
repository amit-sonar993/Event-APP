import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AddEventModel from '../add-event-model/AddEventModel';

function Event() {
  const [show, setShow] = useState(false)

  const handleCloseEventModel = () => {
    setShow(false)
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
          <Button onClick={() => setShow(true)}>Show Alert</Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <AddEventModel show={show} handleClose={handleCloseEventModel}/>
    </div>
  )
}

export default Event
