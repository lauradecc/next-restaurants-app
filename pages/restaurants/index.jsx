import Head from 'next/head'
import { getRestaurants } from '../../services/restaurants.service'
import RestaurantsList from '../../components/RestaurantsList/RestaurantsList'
import { Container } from 'react-bootstrap'


export default function RestaurantsPage({ restaurants }) {

  return restaurants ? (
    <Container>
      <Head>
        <title>Restaurants List</title>
        <meta name='description' content='Restaurants List' />
      </Head>
      <h1>Restaurants</h1>
      <hr className='mb-4' />
      <RestaurantsList restaurants={restaurants} />
    </Container>
  ) :
    <p>Loading...</p>

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
