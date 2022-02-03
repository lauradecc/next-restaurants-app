import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User.model'
import bcrypt from 'bcrypt'
const saltRounds = 10


export default async function handler(req, res) {

  await dbConnect()

  switch (req.method) {
    case 'POST':
      return createUser()
    default:
      res.status(400).json({ code: 400, message: 'Method not managed' })
  }

  async function createUser() {
    try {
      const { username, password } = req.body

      if (username === '' || password === '') {
        res.status(400).json({ message: 'Provide username and password' })
      }

      const user = await User.findOne({ username })
      if (user) {
        return res.status(400).json({ message: 'User already exists' })
      }

      const salt = bcrypt.genSaltSync(saltRounds)
      const hashedPassword = bcrypt.hashSync(password, salt)
      const newUser = await User.create({ username, password: hashedPassword })

      return res.status(201).json({ code: 201, message: 'User created', newUser })
    } catch (error) {
      return res.status(400).json({ code: 400, message: 'Error creating user', error: error.message })
    }
  }

}
