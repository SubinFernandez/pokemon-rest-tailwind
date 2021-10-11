import type { NextPage } from 'next'
import Head from 'next/head'

import { PokemonList } from '@src/components'

const Pokemons: NextPage = () => {
  return (
    <>
      <Head>
        <title>List of Pokemons</title>
        <meta name="description" content="Lists Pokemons based on your pagination setting" />
      </Head>
      <PokemonList />
    </>
  )
}

export default Pokemons