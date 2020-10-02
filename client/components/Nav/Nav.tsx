import './Nav.scss'
import LightSwitch from '../LightSwitch/LightSwitch'
import { Mail, User } from 'react-feather'
import NavItem, { NavItemType } from './NavItem'
import Link from 'next/link'

const NAV_ITEMS: NavItemType[] = [
  {
    id: 'bio',
    title: 'Bio',
    link: '/bio',
    Icon: User,
  },
  {
    id: 'contact',
    title: 'Contact',
    link: '#contact',
    Icon: Mail,
  },
]

const Nav: React.FC = () => {
  return (
    <nav id="nav">
      <Link href="/">
        <a>
          <div id="logo">
            <img src="/logo240.png" alt="logo" />
          </div>
        </a>
      </Link>

      <ul id="nav-items">
        {NAV_ITEMS.map(item => (
          <NavItem key={item.id} {...item} />
        ))}
      </ul>

      <LightSwitch />
    </nav>
  )
}

export default Nav
