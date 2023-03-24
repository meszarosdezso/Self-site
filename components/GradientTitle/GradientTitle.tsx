import React, { PropsWithChildren } from 'react'
import { useMouse } from '../../utils/useMouse'
import { isBrowser, useWindowSize } from '../../utils/window'

export function GradientTitle({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const { dx } = useMouse()
  const { width } = useWindowSize()
  const center = isBrowser() ? 50 + dx / (width / 30) : 50
  const rotation = 60

  return (
    <h1
      style={
        {
          '--center': `${center}%`,
          '--rotation': `${rotation}deg`,
          'fontWeight': '900',
          'background': `linear-gradient(
                var(--rotation),
                #222 calc(var(--center) - 30%),
                #777 calc(var(--center) - 10%),
                #fffc var(--center),
                #777 calc(var(--center) + 10%),
                #222 calc(var(--center) + 30%)
            )`,
          'WebkitTextFillColor': 'transparent',
          'backgroundClip': 'text',
          'WebkitBackgroundClip': 'text',
        } as React.CSSProperties
      }
      className={className}
    >
      {children}
    </h1>
  )
}
