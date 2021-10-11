import type { NextPage } from 'next'
import Head from 'next/head'

import { Hero } from '@src/components'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pokemon demo webapp</title>
        <meta name="description" content="Demo Pokemon webapp that uses Pokemon REST APIs and TailwindCSS" />
      </Head>
      <Hero />
    </>
  )
}

export default Home
