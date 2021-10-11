import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { PokemonDetails } from '@src/components'

const Pokemon: NextPage = () => {
  const router = useRouter()
  const { pokemon } = router.query

  return (
    <>
      <Head>
        <title>{pokemon ? pokemon.concat(' | ') : ''}Pokemon details</title>
        <meta name="description" content="Lists Pokemons based on your pagination setting" />
      </Head>
      <PokemonDetails name={pokemon as string} />
    </>
  )
}

export default Pokemon