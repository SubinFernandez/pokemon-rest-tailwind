import React from 'react'
import Link from 'next/link'

export const Header: React.FC = () => {
  return (
    <header data-name='Header' className='bg-yellow-300 px-4 py-2'>
      <Link href='/'>
        <a>
          <img 
            src='/images/pokemon-75.png' 
            alt='Pokemon' 
            width='139' 
            height='50' 
            loading='eager'
            className='inline-block'
          />
        </a>
      </Link>
    </header>
  )
}