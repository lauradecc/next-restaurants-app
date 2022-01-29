// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import useSWR from 'swr'
import axios from 'axios'

// const fetcher = (url) => fetch(url).then((res) => res.json())


export default function Home({ restaurants }) {

  // const { data, error } = useSWR('/api/restaurants', fetcher)

  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>Loading...</div>

  return (
    <ul>
      {restaurants.map((restaurant, idx) => (
        <p>{restaurant.name}</p> // key={idx}
      ))}
    </ul>
  )

  return (
    <>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

    </>
  )
}

export async function getStaticProps() {

  // const res = await fetch("http://localhost:3000/api/restaurants");
  // const restaurants = await res.json();

  // TODO: Do Not Fetch an API Route from getStaticProps or getStaticPaths => problems in deploy?
  const res = await axios.get(`${process.env.API_URL}/restaurants`)
  const restaurants = await res.data

  return {
    props: {
      restaurants
    }
  }

}
