export interface GetPokemonsResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonFetchInfo[]
}

export interface PokemonFetchInfo {
  name: string
  url: string
}

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  abilities: PokemonAbility[]
  sprites: PokemonSprites
}

export interface PokemonAbility {
  is_hidden: boolean
  slot: number
  ability: {
    name: string
    url: string
  }
}

export interface PokemonSprites {
  front_default: string | null
  front_shiny: string | null
  front_female: string | null
  front_shiny_female: string | null
  back_default: string | null
  back_shiny: string | null
  back_female: string | null
  back_shiny_female: string | null
  other: {
    dream_world: PokemonArtwork
    "official-artwork": PokemonArtwork
  }
}

export interface PokemonArtwork {
  front_default: string | null
  front_female: string | null
}