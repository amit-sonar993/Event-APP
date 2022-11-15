import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Container fluid>
      <Row>
        <Col>1 of 1</Col>
      </Row>
    </Container>
    </div>
  )
}

export default App
