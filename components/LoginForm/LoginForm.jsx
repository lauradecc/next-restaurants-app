import { Form, Button } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { AuthContext } from '../../context/auth.context'


export default function LoginForm(props) {

  const { setIsLoggedIn } = useContext(AuthContext)

  const router = useRouter()

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })

  const { username, password } = loginForm

  const handleInputChange = e => {
    const { name, value } = e.target
    setLoginForm({ ...loginForm, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isSignedIn = await signIn('credentials', { redirect: false, username, password })
    if (isSignedIn.ok) setIsLoggedIn(true)
    // TODO: Inform user about wrong credentials
    router.push('/restaurants')
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

      <Button variant='dark' type='submit' style={{ width: '100%' }}>Login</Button>

    </Form>
  )

}
