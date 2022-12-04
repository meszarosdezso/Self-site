import Head from 'next/head'
import { ReactNode } from 'react'
import {
  FAVICON_URL,
  META_DESCRIPTION,
  META_TITLE,
  OG_IMAGE,
  OG_URL,
  TITLE_BASE,
} from '../../constants/meta'
import Footer from '../Footer/Footer'

type Props = {
  title: string
  description?: string
  children: ReactNode
}

const Layout: React.FC<Props> = ({
  title,
  description = META_DESCRIPTION,
  children,
}) => {
  const titleContent = title ? `${title} | ${TITLE_BASE}` : TITLE_BASE
  return (
    <div className="page">
      <Head>
        <title>{titleContent}</title>
        <meta name="description" content={description} />
        <meta name="og:title" content={META_TITLE} />
        <meta name="og:description" content={description} />
        <meta name="og:url" content={OG_URL} />
        <meta name="og:image" content={OG_IMAGE} />
        <link rel="icon" type="image/png" href={FAVICON_URL} />
        <link
          rel="stylesheet"
          href="https://use.typekit.net/jpp1qyx.css"
        ></link>
      </Head>
      <div className="body">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
