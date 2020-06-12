import Head from "next/head"
import { useProfile } from "../../providers/profile.provider"
import { ReactNode } from "react"
import Footer from "../Footer/Footer"
import { useTheme } from "../../providers/theme.provider"

type Props = {
  title: string
  description: string
  children: ReactNode
  bodyClass?: string
  noFooter?: boolean
}

const Layout: React.FC<Props> = ({
  title,
  description,
  children,
  bodyClass,
  noFooter,
}) => {
  const { name, avatar_url } = useProfile()
  const { backgroundColor } = useTheme()

  return (
    <div className="page">
      <Head>
        <title>
          {title} | {name}
        </title>
        <meta name="description" content={description} />
        <meta name="og:title" content={name} />
        <meta name="og:description" content={description} />
        <meta name="og:url" content={"https://self-site.now.sh/"} />
        <meta name="og:image" content={avatar_url} />
        <link rel="icon" type="image/png" href="/logo120.png" />
      </Head>
      <div className={`body ${bodyClass}`}>
        <div
          style={{
            background: backgroundColor,
          }}
          id="main-background"
        ></div>
        {children}
      </div>
      {!noFooter && <Footer />}
    </div>
  )
}

export default Layout
