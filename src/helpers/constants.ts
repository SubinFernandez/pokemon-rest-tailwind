export const REST_API = {
  url: 'https://pokeapi.co/api/v2',
  endpoints: {
    pokemon: 'pokemon',
    ability: 'ability',
    species: 'pokemon-species'
  }
}

export const DEFAULTS = {
  pokemon: {
    firstPokemon: 0,
    pokemonsPerPage: 20,
    pokemonsPerPageOptions: [
      10, 20, 50
    ]
  }
}

// Check if we're in browser like environment
export const IS_BROWSER: boolean = typeof window !== 'undefined';

export const LOCAL_STORAGE_KYES = {
  gallery: {
    filter: {
      byName: 'filter.byName',
      byAbility: 'filter.byAbility'
    },
    sort: 'sort'
  }
}