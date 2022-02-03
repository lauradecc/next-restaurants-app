import { getRestaurants, getRestaurant } from '../../services/restaurants.service'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { updateUser } from '../../services/users.service'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import Link from 'next/link'


export default function RestaurantDetailsPage({ restaurant }) {

  const { data: session } = useSession()
  const { user, setUser } = useContext(AuthContext)

  const router = useRouter()
  const { id } = router.query

  const [isFavourite, setIsFavourite] = useState(false)

  useEffect(() => {
    if (user?.favouriteRestaurants.includes(Number(id))) {
      setIsFavourite(true)
    }
  }, [])

  const displayReviews = () => {
    const reviews = restaurant.reviews.map(review => {
      return (
        <article key={`${review.name} - ${review.date}`} className='mb-4'>
          <h4>{review.name} - {review.date}</h4>
          <p><b>Rating: {review.rating}</b></p>
          <p>{review.comments}</p>
        </article>
      )
    })
    return reviews
  }

  const handleClick = async action => {

    const data = {
      userId: session.user._id,
      restaurantId: id,
      action
    }

    const response = await updateUser(data)
    const updatedUser = response.data.updatedUser
    setUser(updatedUser)
    setIsFavourite(!isFavourite)

  }

  return (
    <>
      <Head>
        <title>{restaurant.name}</title>
        <meta name='description' content={`${restaurant.name} serves ${restaurant.cuisine_type} food in ${restaurant.neighborhood}.`} />
      </Head>

      <Container>
        <h1 className='text-center'>{restaurant.name}</h1>
        <h2 className='text-center'>- {restaurant.cuisine_type} Restaurant -</h2>
        <Row className='mt-5'>
          <Col md={6}>
            <Image src={restaurant.image} width={500} height={300} alt={restaurant.name} className='card-img' />
            {session && (isFavourite ?
              <Button onClick={() => handleClick('REMOVE_FAVOURITE')} variant='dark' size='xl' className='mt-3 mb-3'>Remove from favourites</Button>
              :
              <Button onClick={() => handleClick('ADD_FAVOURITE')} variant='dark' size='xl' className='mt-3 mb-3'>Add to favourites</Button>
            )}
          </Col>
          <Col md={6}>
            <p><b>Location: </b>{restaurant.neighborhood} ({restaurant.address})</p>
            <p><b>Opening Hours:</b></p>
            <ul>
              <li><b>Monday:</b> {restaurant.operating_hours.Monday}</li>
              <li><b>Tuesday:</b> {restaurant.operating_hours.Tuesday}</li>
              <li><b>Wednesday:</b> {restaurant.operating_hours.Wednesday}</li>
              <li><b>Thursday:</b> {restaurant.operating_hours.Thursday}</li>
              <li><b>Friday:</b> {restaurant.operating_hours.Friday}</li>
              <li><b>Saturday:</b> {restaurant.operating_hours.Saturday}</li>
              <li><b>Sunday:</b> {restaurant.operating_hours.Sunday}</li>
            </ul>
          </Col>
        </Row>
        <h3 className='mt-5 mb-4'>Users' Reviews</h3>
        {displayReviews()}
        <Link href='/restaurants'>
          <a>
            <Button variant='dark' size='xl' className='mt-3 mb-5'>
              Go back
            </Button>
          </a>
        </Link>
      </Container>
    </>
  )

}

export async function getStaticPaths() {

  const response = await getRestaurants()
  const restaurants = response.data

  const paths = restaurants.map(restaurant => {
    return {
      params: { id: restaurant.id.toString() }
    }
  })

  return {
    paths,
    fallback: false
  }

}

export async function getStaticProps({ params }) {

  const response = await getRestaurant(params.id)
  const restaurant = response.data

  return {
    props: {
      restaurant,
    },
  }

}
