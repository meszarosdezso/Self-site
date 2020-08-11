import { AppPropsType } from "next/dist/next-server/lib/utils"
import "./_app.scss"
import "@fortawesome/fontawesome-svg-core/styles.css"
import ScrollProvider from "../providers/scroll"

export default function App({ Component, pageProps }: AppPropsType) {
  return (
    <ScrollProvider>
      <Component {...pageProps} />
    </ScrollProvider>
  )
}
