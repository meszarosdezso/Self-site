import './Instagram.scss'
import { InstagramPost } from '../../models/instagram'
import { ExternalLink } from 'react-feather'
import InstagramCaption from './Caption'

const Instagram: React.FC<{ posts: InstagramPost[] }> = ({ posts }) => {
  return (
    <div id="Instagram">
      <br />
      <h1>
        Latest posts on
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://instagram.com/meszarosdezso"
        >
          <span className="accent-bg">Instagram</span>
        </a>
      </h1>

      <div className="posts">
        <div className="left">
          {posts
            .filter((_, i) => !(i % 2))
            .map(post => (
              <Post key={post.id} post={post} />
            ))}
        </div>

        <div className="right">
          {posts
            .filter((_, i) => i % 2)
            .map(post => (
              <Post key={post.id} post={post} />
            ))}
        </div>
      </div>
    </div>
  )
}

const Post: React.FC<{ post: InstagramPost }> = ({ post }) => {
  return (
    <div id={`ig-${post.id}`} key={post.id} className={`post`}>
      <img src={post.thumbnail_url || post.media_url} alt={post.caption} />

      <div className="caption sans">
        <p>
          <InstagramCaption>{post.caption}</InstagramCaption>
          <br />
          <br />
          {/* 👆 Please don't tell my boss */}
          <a target="_blank" rel="noopener noreferrer" href={post.permalink}>
            <ExternalLink />
          </a>
        </p>
      </div>
    </div>
  )
}

export default Instagram
