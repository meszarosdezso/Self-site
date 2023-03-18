import Head from 'next/head'
import { ReactNode } from 'react'
import {
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
  hideFooter?: boolean
}

const Layout: React.FC<Props> = ({
  title,
  description = META_DESCRIPTION,
  children,
  hideFooter,
}) => {
  const titleContent = title ? `${title} | ${TITLE_BASE}` : TITLE_BASE

  const isDark =
    typeof localStorage === 'undefined'
      ? true
      : localStorage.getItem('md-theme-mode') === 'dark'

  return (
    <div className="page">
      <Head>
        <title>{titleContent}</title>
        <meta name="description" content={description} />
        <meta name="og:title" content={META_TITLE} />
        <meta name="og:description" content={description} />
        <meta name="og:url" content={OG_URL} />
        <meta name="og:image" content={OG_IMAGE} />
        <link
          rel="icon"
          media="(prefers-color-scheme: light)"
          type="image/png"
          href="/favicon_light.png"
        />
        <link
          rel="icon"
          media="(prefers-color-scheme: dark)"
          type="image/png"
          href="/favicon_dark.png"
        />
        <meta name="theme-color" content={isDark ? '#0a0a0a' : '#ffffff'} />
      </Head>
      <div className="body">{children}</div>
      {!hideFooter && <Footer />}
    </div>
  )
}

export default Layout
