import "./Instagram.scss"
import { InstagramPost } from "../../models/instagram"
import { ExternalLink } from "react-feather"

const Instagram: React.FC<{ posts: InstagramPost[] }> = ({ posts }) => {
  return (
    <div id="Instagram">
      <br />
      <h1>
        Latest posts on
        <br />
        <span className="accent-bg">Instagram</span>
      </h1>

      <div className="posts">
        {posts.map((post, i) => (
          <div key={post.id} className={`post ${i % 2 ? "right" : "left"}`}>
            <div className="image">
              <img
                src={post.thumbnail_url || post.media_url}
                alt={post.caption}
              />
            </div>

            <div className="caption sans">
              <p>
                {post.caption.split(/\.\n/)[0]}
                <br />
                <br />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={post.permalink}
                >
                  <ExternalLink />
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Instagram
