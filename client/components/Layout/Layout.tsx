import Head from "next/head"
import { useProfile } from "../../providers/profile.provider"
import { ReactNode } from "react"

type Props = {
  title: string
  description: string
  children: ReactNode
}

const Layout: React.FC<Props> = ({ title, description, children }) => {
  const { name, avatar_url } = useProfile()

  return (
    <div className="page">
      <Head>
        <title>
          {title} | {name}
        </title>
        <meta name="description" content={description} />
        <meta name="og:title" content={name} />
        <meta name="og:description" content={description} />
        <meta name="og:url" content={"https://meszarosdezso.com/"} />
        <meta name="og:image" content={avatar_url} />
        <link rel="icon" type="image/png" href="/logo120.png" />
      </Head>
      <div className="body">{children}</div>
    </div>
  )
}

export default Layout
