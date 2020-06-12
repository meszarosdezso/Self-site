import Avatar from "../Avatar/Avatar"
import AC from "../Ac/Ac"
import "./LandingPage.scss"
import { useProfile } from "../../providers/profile.provider"
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher"
import { useTheme, AccentColors } from "../../providers/theme.provider"
import { colorWithOpacity } from "../../utils/colors"
import MyName from "../MyName/MyName"

const LandingPage: React.FC = () => {
  const { name, avatar_url } = useProfile()

  const { isDark } = useTheme()

  return (
    <div className="LandingPage section">
      <div id="avatar">
        <Avatar url={avatar_url} size={300} />
      </div>
      <div className="name-and-texts">
        <MyName name={name} />
        <h1 className="mono" id="title">
          <AC>The most useless website ever</AC>
        </h1>
        <div id="mine">
          <span
            id="mine-line"
            style={{
              background: isDark
                ? colorWithOpacity("#FFFFFF", 0.3)
                : AccentColors["ORANGE"],
            }}
          ></span>
          Mine.
        </div>
      </div>
      <ThemeSwitcher
        style={{ position: "absolute", left: "2rem", bottom: "2rem" }}
      />
    </div>
  )
}

export default LandingPage
