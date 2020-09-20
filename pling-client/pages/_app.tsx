import React from 'react'
import Navbar from '../components/navbar'
import './globals.scss'

function MyApp({ Component, pageProps }) {
  return (
      <>
        <Navbar />
        <Component {...pageProps} />
      </>
  )
}

export default MyApp;
