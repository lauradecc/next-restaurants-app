import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { signup } from '../../services/auth.service'


export default function SignupForm(props) {

  const router = useRouter()

  const [signupForm, setSignupForm] = useState({
    username: '',
    password: ''
  })

  const { username, password } = signupForm

  const handleInputChange = e => {
    const { name, value } = e.target
    setSignupForm({ ...signupForm, [name]: value })
  }

  const handleSubmit = e => {

    e.preventDefault()
    const credentials = { username, password }

    signup(credentials)
      .then(() => router.push('/login'))
      // TODO: Inform user about wrong credentials
      .catch(err => console.log('Invalid credentials', err))

  }

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group className='mb-3'>
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' name='username' value={username} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' name='password' value={password} onChange={handleInputChange} />
      </Form.Group>

      <Button variant='dark' type='submit' style={{ width: '100%' }}>Signup</Button>

    </Form>
  )

}
