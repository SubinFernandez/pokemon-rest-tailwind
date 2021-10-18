import React from 'react'
import Image from'next/image'
import Link from 'next/link'

export const Header: React.FC = () => {
  return (
    <header data-name='Header' className='bg-yellow-300 px-4 py-2'>
      <Link href='/'>
        <a>
          <Image 
            src='/images/pokemon-50-2x.webp' 
            alt='Pokemon' 
            width={139} 
            height={50} 
            loading='eager'
            className='inline-block'
          />
        </a>
      </Link>
    </header>
  )
}