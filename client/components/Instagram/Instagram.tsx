import { InstagramPost } from "../../models/instagram"
import "./Instagram.scss"
import InstagramCaption from "./Caption"
import { parseISO8601 } from "../../utils/date"
import { useTheme } from "../../providers/theme.provider"
import { LazyLoadImage as Image } from "react-lazy-load-image-component"

type Props = {
  posts: InstagramPost[]
}

const Instagram: React.FC<Props> = ({ posts }) => {
  const { isDark } = useTheme()

  return (
    <div
      className="Instagram"
      style={{ backgroundColor: isDark ? "#0003" : "#fff7" }}
    >
      <br />
      <h2 className="title">My latest posts on Instagram</h2>
      <br />
      <div id="insta-grid">
        {posts.map((post) => (
          <div key={post.id} className="InstagramPost">
            <Image
              src={
                post.media_type === "VIDEO"
                  ? post.thumbnail_url
                  : post.media_url
              }
              loading="lazy"
              alt={post.timestamp}
            />
            <InstagramCaption>{post.caption}</InstagramCaption>
            <h4 className="post-date mono">{parseISO8601(post.timestamp)}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Instagram
