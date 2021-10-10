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