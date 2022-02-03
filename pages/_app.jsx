import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Navigation from '../components/Navigation/Navigation'
import { AuthProviderWrapper } from '../context/auth.context'


export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <SessionProvider session={session}>
      <AuthProviderWrapper>
        <Navigation />
        <Component {...pageProps} />
      </AuthProviderWrapper>
    </SessionProvider>
  )

}
