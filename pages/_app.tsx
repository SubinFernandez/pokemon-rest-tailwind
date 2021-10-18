import { useState } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'

import { AppSettingContext } from '@src/contexts/app'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  const [galleryScrollYPos, setGalleryScrollYPos] = useState(0)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AppSettingContext.Provider value={{ galleryScrollYPos, setGalleryScrollYPos }}>
        <Component role='main' {...pageProps} />
      </AppSettingContext.Provider>
    </>
  )
}
export default MyApp
