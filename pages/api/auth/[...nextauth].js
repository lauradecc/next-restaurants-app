import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../lib/mongodb'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '../../../models/User.model'
import dbConnect from '../../../lib/dbConnect'
import bcrypt from 'bcrypt'


export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Your name' },
        password: { label: 'Password', type: 'password', placeholder: 'Your password' }
      },
      async authorize(credentials, req) {

        await dbConnect()

        const { username, password } = credentials
        const user = await User.findOne({ username })

        if (!user) {
          res.status(401).json({ code: 401, message: 'Username not registered' })
          return null
        }

        if (bcrypt.compareSync(password, user.password) === false) {
          res.status(401).json({ code: 401, message: 'Incorrect password' })
          return null
        }

        return user

      }
    })
  ],
  secret: 'qJW2PIV9FE0lTBA5oT6gJsrdzhPtl8Orq9+gaQhkeQI=',
  session: {
    jwt: true,
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user
      /* Did this because the user was updated in the ddbb from the client
      but the session didn't update in the front */
      const updatedUser = await User.findById(token.user._id)
      session.user = updatedUser
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
  },

})
