import { useState, useEffect, createContext } from 'react'
import { useSession } from 'next-auth/react'

const AuthContext = createContext()


function AuthProviderWrapper(props) {

  const { data: session } = useSession()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    session ? setUser(session.user) : setUser(null)
  }, [isLoggedIn])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext }
