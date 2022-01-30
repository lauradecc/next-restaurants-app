import axios from 'axios'

class UsersService {

  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.API_URL}/users`,
      withCredentials: true,
    })
  }

  getUsers = () => this.instance.get('/')

  // getUser = id => this.instance.get(`/${id}`)

  // sin favourite restaurants
  createUser = (username, pwd) => this.instance.post("/signup", { email, username, pwd })
  // signup = (email, username, pwd) => this.instance.post("/signup", { email, username, pwd })

  deleteUser = id => this.instance.delete(`/${id}`)

  updateUser = (id, data) => this.instance.put(`/${id}`, data)
  // editUserInfo = (name, email, description, profileImage, location) => this.instance.put(`/edit/profile`, { name, email, description, profileImage, location })

}

export default UsersService
