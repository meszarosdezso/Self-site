import React, { PropsWithChildren } from 'react'
import { useMouse } from '../../utils/useMouse'
import { isBrowser, useWindowSize } from '../../utils/window'

export function GradientTitle({ children }: PropsWithChildren) {
  const { dx } = useMouse()
  const { width } = useWindowSize()
  const center = isBrowser() ? 50 + dx / (width / 20) : 50

  return (
    <h1
      style={
        {
          '--center': `${center}%`,
          'fontWeight': '900',
          'background': `linear-gradient(
                60deg,
                #222 calc(var(--center) - 25%),
                #666 calc(var(--center) - 10%),
                #fff var(--center),
                #666 calc(var(--center) + 10%),
                #222 calc(var(--center) + 25%)
            )`,
          'WebkitTextFillColor': 'transparent',
          'backgroundClip': 'text',
          'WebkitBackgroundClip': 'text',
        } as React.CSSProperties
      }
    >
      {children}
    </h1>
  )
}
