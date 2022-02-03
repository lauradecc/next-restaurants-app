import { Row } from 'react-bootstrap'
import RestaurantItem from '../RestaurantItem/RestaurantItem'


export default function RestaurantsList({ restaurants, areFavourites }) {

  const displayRestaurants = () => restaurants.map(restaurant => {
    return (
      <RestaurantItem
        key={restaurant.id}
        restaurant={restaurant}
        areFavourites={areFavourites} />
    )
  })

  return restaurants ? (
    <Row>
      {
        restaurants.length > 0 ?
          displayRestaurants()
          :
          <p>No restaurants to show.</p>
      }
    </Row>
  ) :
    <p>Loading...</p>

}
