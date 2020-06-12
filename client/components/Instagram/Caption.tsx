import AC from "../Ac/Ac"

const InstagramCaption: React.FC = ({ children }) => {
  return (
    <p className="caption">
      {parseCaption(children!.toString())
        .split(" ")
        .map((w, i) => {
          if (w.includes("@")) {
            return (
              <a
                key={w + i}
                className="ig-username"
                href={`https://instagram.com/${w.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AC>{w} </AC>
              </a>
            )
          } else return w + " "
        })}
    </p>
  )
}

const parseCaption = (text: string) => {
  return text.replace(/#(\w+)/g, "").replace(/\.\n/g, " ")
}

export default InstagramCaption
