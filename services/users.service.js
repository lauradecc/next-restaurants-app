import axios from 'axios'

const UsersService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/users`
})

export const signup = credentials => UsersService.post('/', credentials)

export const getUsers = () => UsersService.get('/')

export const getUser = () => UsersService.get(`/${id}`)

export const updateUser = data => UsersService.put(`/${data.userId}`, data)

export const deleteUser = id => UsersService.delete(`/${id}`)
