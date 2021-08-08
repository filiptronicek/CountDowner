import '../styles/globals.css'
import type { AppProps } from 'next/app'

function CountDowner({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default CountDowner
