import "./MyName.scss"
import Link from "next/link"

const MyName: React.FC<{ name: string; style?: React.CSSProperties }> = ({
  name,
  style,
}) => {
  return (
    <Link href="/">
      <div className="MyName" style={style}>
        {name.split(" ").map((part, i) => (
          <h5 className="mono" key={i}>
            {part}
          </h5>
        ))}
      </div>
    </Link>
  )
}

export default MyName
