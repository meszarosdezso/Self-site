import { useMouse } from '../../utils/useMouse'
import { useRef, MutableRefObject } from 'react'
import Link from 'next/link'

export type NavItemType = {
  id: string
  title: string
  link: string
  Icon: React.FC
}

const NavItem: React.FC<NavItemType> = ({ title, id, link, Icon }) => {
  const ref = useRef<HTMLLIElement>()
  const { x } = useMouse(ref)

  const leftOffset =
    x -
    (ref!.current !== undefined
      ? ref.current.offsetLeft + ref.current?.clientWidth / 2
      : 100)

  return (
    <li id={`${id}-link`} ref={ref as MutableRefObject<HTMLLIElement>}>
      <Link scroll={false} href={link}>
        <a>
          <h4>{title}</h4>
          <span
            style={{
              left: `calc(50% + ${leftOffset}px)`,
            }}
            className="icon"
          >
            <Icon />
          </span>
        </a>
      </Link>
    </li>
  )
}

export default NavItem
