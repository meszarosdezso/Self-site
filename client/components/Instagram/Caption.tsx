import React from 'react'

const InstagramCaption: React.FC = ({ children }) => {
  return (
    <>
      {parseCaption(children!.toString())
        .split(' ')
        .map((w, i) => {
          if (w.startsWith('@')) {
            return (
              <a
                key={w + i}
                className="ig-username"
                href={`https://instagram.com/${w.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent-color', fontWeight: 500 }}
              >
                {w}{' '}
              </a>
            )
          } else return w + ' '
        })}
    </>
  )
}

const parseCaption = (text: string) => {
  return text.replace(/#(\w+)/g, '').replace(/\.\n/g, ' ')
}

export default InstagramCaption
