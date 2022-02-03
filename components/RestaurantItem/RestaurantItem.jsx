import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button, Card, Row, Col } from 'react-bootstrap'


export default function RestaurantItem({ restaurant, handleClick, areFavourites }) {

  const { data: session } = useSession()

  return (
    <Col md={4} className='mb-4'>
      {/* TODO: would be 'restaurant._id' if using ddbb */}
      {/* TODO: Create RestaurantItem */}
      <Card>
        <Link href={`/restaurants/${restaurant.id}`}><a>
          <Card.Img src={restaurant.image} />
        </a></Link>
        <Card.Body>
          <Card.Title>
            <Link href={`/restaurants/${restaurant.id}`}><a>
              {restaurant.name}
            </a></Link>
          </Card.Title>
          <Card.Text>
            {restaurant.cuisine_type} restaurant in {restaurant.neighborhood}
          </Card.Text>
          <Card.Link>
            {
              session && areFavourites &&
              <Button
                onClick={() => handleClick('REMOVE_FAVOURITE', restaurant.id)}
                variant='dark'
                size='sm'
              >
                Remove from favourites
              </Button>
            }
          </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  )

}
