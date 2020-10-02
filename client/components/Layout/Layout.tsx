import Head from 'next/head'
import { ReactNode } from 'react'
import Footer from '../Footer/Footer'

type Props = {
  title: string
  description?: string
  children: ReactNode
}

const Layout: React.FC<Props> = ({
  title,
  description = 'I am a Budapest based Hungarian developer, creating web and cross platform mobile apps, user interfaces and experiences.',
  children,
}) => {
  return (
    <div className="page">
      <Head>
        <title>{title} | Dezso Meszaros - Front-end developer 👨🏽‍💻</title>
        <meta name="description" content={description} />
        <meta name="og:title" content="Dezso Meszaros" />
        <meta name="og:description" content={description} />
        <meta name="og:url" content={'https://meszarosdezso.com/'} />
        <meta
          name="og:image"
          content={'https://meszarosdezso.com/littler_me.jpg'}
        />
        <link rel="icon" type="image/png" href="/logo120.png" />
      </Head>
      <div className="body">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
