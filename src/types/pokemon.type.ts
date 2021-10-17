export interface NamedAPIResource {
  name: string
  url: string
}
export interface NamedAPIResourceList {
  count: number
  next: string | null
  previous: string | null
  results: NamedAPIResource[]
}

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  abilities: PokemonAbility[]
  sprites: PokemonSprites
  species: NamedAPIResource
  stats: PokemonStat[]
}

export interface PokemonAbility {
  is_hidden: boolean
  slot: number
  ability: NamedAPIResource
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

export interface PokemonSpecies {
  base_happiness: number
  capture_rate: number
  color: NamedAPIResource
  generation: NamedAPIResource
  growth_rate: NamedAPIResource
  habitat?: NamedAPIResource
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  shape: NamedAPIResource
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: NamedAPIResource
}

export interface Ability {
  pokemon: AbilityPokemons[]
}

export interface AbilityPokemons {
  is_hidden: boolean
  pokemon: NamedAPIResource
  slot: number
}