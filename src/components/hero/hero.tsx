import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// import image from '../../../public/images/pokemon-animated.gif'

export const Hero: React.FC = () => {
  return (
    <div data-name='Hero' className='text-center mb-20'>
      <Image
        src='/images/pokemon-animated.gif'
        alt=''
        height={578}
        width={720}
        loading='lazy'
      />
      <h1 className='text-2xl font-bold'>Pokemon Demo Web-app</h1>
      <p className='my-4'>Made using <a className='link' href='https://nextjs.org' target='_blank' rel='noreferrer'>Next.js</a> with <a className='link' href='https://www.typescriptlang.org' target='_blank' rel='noreferrer'>TypeScript</a> and <a className='link' href='https://tailwindcss.com' target='_blank' rel='noreferrer'>TailwindCSS</a>. REST API consumed from <a className='link' href='https://pokeapi.co/' target='_blank' rel='noreferrer'>PokeAPI</a>.</p>
      <div><Link href='/pokemons'><a className='link-button'>View Demo</a></Link></div>
    </div>
  )
}