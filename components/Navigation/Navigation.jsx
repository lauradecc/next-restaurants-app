import { useContext } from 'react'
import { Navbar, Nav, Container, NavLink } from 'react-bootstrap'
import Link from 'next/link'
import { AuthContext } from '../../context/auth.context'
import { signOut } from 'next-auth/react'


export default function Navigation() {

  // const { data: session, status } = useSession()
  const { setIsLoggedIn, user } = useContext(AuthContext)

  const logout = () => {
    setIsLoggedIn(false)
    signOut()
  }


  return (
    <Navbar bg='dark' expand='lg' variant='dark' className='mb-5'>
      <Container>
        <Navbar.Brand>Tailor's Restaurants</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end' >
          <Nav>
            <Link href='/'>
              <a className='nav-link'>Home</a>
            </Link>
            <Link href='/restaurants'>
              <a className='nav-link'>Restaurants</a>
            </Link>

            {user ?
              <>
                <Link href='/profile'>
                  <a className='nav-link'>{user.username}'s profile</a>
                </Link>
                {/* TODO: logout hover like other links */}
                <a onClick={() => logout()} className='nav-link'>Log out</a>
              </>
              :
              <>
                <Link href='/login'>
                  <a className='nav-link'>Login</a>
                </Link>
                <Link href='/signup'>
                  <a className='nav-link'>Signup</a>
                </Link>
              </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
