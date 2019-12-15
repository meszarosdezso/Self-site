import React, { useState, useEffect } from "react"
import "./TextChanger.scss"

const TextChanger: React.FC<{
  texts: string[]
  duration?: number
  textStyle?: React.CSSProperties
}> = ({ texts, duration, textStyle }) => {
  const [visibleIndex, setVisibleIndex] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setVisibleIndex((visibleIndex + 1) % texts.length)
    }, 3000)
  }, [visibleIndex, texts])

  return (
    <div className='TextChanger'>
      {texts.map((text, index) => (
        <h3
          key={index}
          style={{
            ...textStyle,
            opacity: index === visibleIndex ? textStyle!.opacity || 1 : 0
          }}
        >
          {text}
        </h3>
      ))}
    </div>
  )
}

export default TextChanger
