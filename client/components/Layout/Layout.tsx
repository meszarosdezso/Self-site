import Head from "next/head"
import { ReactNode } from "react"

type Props = {
  title: string
  description: string
  children: ReactNode
}

const Layout: React.FC<Props> = ({ title, description, children }) => {
  return (
    <div className="page">
      <Head>
        <title>{title} | Dezso Meszaros</title>
        <meta name="description" content={description} />
        <meta name="og:title" content="Dezso Meszaros" />
        <meta name="og:description" content={description} />
        <meta name="og:url" content={"https://meszarosdezso.com/"} />
        <meta
          name="og:image"
          content={"https://meszarosdezso.com/little_me.jpg"}
        />
        <link rel="icon" type="image/png" href="/logo120.png" />
      </Head>
      <div className="body">{children}</div>
    </div>
  )
}

export default Layout
