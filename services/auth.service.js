import axios from 'axios'

const AuthService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth`
})

export const signup = credentials => AuthService.post('/signup', credentials)
