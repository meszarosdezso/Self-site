import { AppPropsType } from 'next/dist/shared/lib/utils'

import './_app.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function App({ Component, pageProps }: AppPropsType) {
  return <Component {...pageProps} />
}
