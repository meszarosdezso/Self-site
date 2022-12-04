import styles from "./Nav.module.scss"
import LightSwitch from "../LightSwitch/LightSwitch"
import { Mail, User, Image } from "react-feather"
import NavItem, { NavItemType } from "./NavItem"
import Link from "next/link"

const NAV_ITEMS: NavItemType[] = [
  {
    id: "viz",
    title: "Visualizations",
    link: "/visualizations",
    Icon: Image,
  },
  {
    id: "bio",
    title: "Bio",
    link: "/bio",
    Icon: User,
  },
  {
    id: "contact",
    title: "Contact",
    link: "#contact",
    Icon: Mail,
  },
]

interface Props {
  hideMenu?: boolean
}

const Nav: React.FC<Props> = ({ hideMenu = false }) => {
  return (
    <nav id={styles.Nav}>
      <Link href="/">
        <div id={styles.logo}>
          <img src="/logo240.png" alt="logo" />
        </div>
      </Link>

      <ul id={styles.navItems}>
        {!hideMenu
          ? NAV_ITEMS.map(item => <NavItem key={item.id} {...item} />)
          : null}
      </ul>

      <LightSwitch />
    </nav>
  )
}

export default Nav
