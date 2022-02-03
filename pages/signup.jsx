import { Container, Row, Col } from 'react-bootstrap'
import SignupForm from '../components/SignupForm/SignupForm'


export default function SignupPage() {

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md={4}>
          <h1>Signup</h1>
          <hr />
          <SignupForm />
        </Col>
      </Row>
    </Container>
  )

}
