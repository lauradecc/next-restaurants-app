import { Row } from 'react-bootstrap'
import { updateUser } from '../../services/users.service'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import RestaurantItem from '../RestaurantItem/RestaurantItem'


export default function RestaurantsList({ restaurants, areFavourites }) {

  const { user, setUser } = useContext(AuthContext)

  const handleClick = async (action, id) => {

    const data = {
      userId: user._id,
      restaurantId: id,
      action
    }

    const response = await updateUser(data)
    const updatedUser = response.data.updatedUser
    setUser(updatedUser)

  }

  const displayRestaurants = () => restaurants.map(restaurant => {
    return (
      <RestaurantItem
        key={restaurant.id}
        handleClick={handleClick}
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
