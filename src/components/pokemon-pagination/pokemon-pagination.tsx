import React from 'react'
import { useRouter } from 'next/router'

import ReactPaginate from 'react-paginate'
// @TODO: Debug why '@src/' path fails in Jest test
import { DEFAULTS } from '../../helpers/constants'

interface PokemonPaginationProps {
  pokemonCount: number
  pokemonPerPage?: number
  selectedPage?: number
  onPageChange: (pageNumber: number) => void
}

export const PokemonPagination: React.FC<PokemonPaginationProps> = ({
  pokemonCount,
  pokemonPerPage = DEFAULTS.pokemon.pokemonsPerPage,
  selectedPage = 0,
  onPageChange
}) => {
  const router = useRouter()

  return (
    <div data-name='PokemonPagination' className='overflow-scroll'>
      <ReactPaginate
        pageCount={Math.ceil(pokemonCount / pokemonPerPage)}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        forcePage={selectedPage}
        previousLabel='&laquo;'
        nextLabel='&raquo;'
        containerClassName='flex m-2'
        previousClassName='border border-solid border-gray-300 border-r-0 rounded-tl rounded-bl text-blue-600'
        previousLinkClassName='flex justify-center items-center px-2 py-1 w-10'
        pageClassName='border border-solid border-gray-300 border-r-0 text-blue-600'
        pageLinkClassName='flex justify-center items-center p-1 w-10'
        breakClassName='border border-solid border-gray-300 border-r-0'
        breakLinkClassName='flex justify-center items-center p-1 w-8'
        activeClassName='bg-blue-600 border-blue-600'
        activeLinkClassName='text-white'
        nextClassName='border border-solid border-gray-300 rounded-tr rounded-br text-blue-600'
        nextLinkClassName='flex justify-center items-center px-2 py-1 w-10'
        onPageChange={page => onPageChange(page.selected)}
        
      />
    </div>
  )
}