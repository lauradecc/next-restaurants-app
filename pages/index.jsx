import { Container, Button } from 'react-bootstrap'
import Link from 'next/link'
import Head from 'next/head'

export default function Home({ restaurants }) {

  return (
    <Container>
      <Head>
        <title>Restaurants App</title>
        <meta name='description' content='Created by Laura de Cos' />
      </Head>

      <h1>This was supposed to be a beautiful homepage 🦕</h1>
      <hr className='mb-4' />
      {/* TODO: Make a pretty homepage */}
      <Link href='/restaurants'>
        <Button variant='dark' size='xl' className='me-2'>See restaurants</Button>
      </Link>
    </Container>
  )

}
