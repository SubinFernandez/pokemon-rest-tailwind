import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pokemon demo webapp</title>
        <meta name="description" content="Demo Pokemon webapp that uses Pokemon REST APIs and TailwindCSS" />
      </Head>
      <h1>Hello Pokemon</h1>
    </>
  )
}

export default Home
