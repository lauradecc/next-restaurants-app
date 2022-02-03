import { Container, Button } from 'react-bootstrap'
import { useSession } from 'next-auth/react'
import RestaurantsList from '../components/RestaurantsList/RestaurantsList'
import { getRestaurants } from '../services/restaurants.service'
import { useRouter } from 'next/router'
import { deleteUser } from '../services/users.service'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth.context'


export default function UserProfile({ restaurants }) {

  const { data: session, status } = useSession()
  const { setIsLoggedIn, setUser } = useContext(AuthContext)
  const { user } = useContext(AuthContext)
  const router = useRouter()

  const [favouriteRestaurants, setFavouriteRestaurants] = useState([])

  useEffect(() => {
    const favRestaurants = restaurants.filter(restaurant => {
      return user?.favouriteRestaurants.includes(restaurant.id)
    })
    setFavouriteRestaurants(favRestaurants)
  }, [user])

  const deleteUserAccount = async () => {
    await setIsLoggedIn(false)
    await deleteUser(session.user._id)
    setUser(null)
    router.push('/signup')
  }

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'unauthenticated') router.push('/login')

  return session && (
    <Container>
      <h1>My Profile</h1>
      <hr className='mb-4' />
      <h2 className='mb-4'>My favourite restaurants</h2>
      {session && <RestaurantsList restaurants={favouriteRestaurants} areFavourites={true} />}
      <hr />
      <Button onClick={deleteUserAccount} variant='danger' size='xl' className='mt-3 mb-5'>Delete my account</Button>
    </Container>
  )

}

export async function getStaticProps() {

  const response = await getRestaurants()
  const restaurants = response.data

  return {
    props: {
      restaurants
    }
  }

}
