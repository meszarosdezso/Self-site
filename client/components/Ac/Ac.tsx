import React, { HTMLProps, FC } from "react"
import { useTheme } from "../../providers/theme.provider"

const AC: FC<HTMLProps<HTMLSpanElement>> = (props) => {
  const { accentColor } = useTheme()
  return (
    <span
      {...props}
      style={{ color: accentColor, fontFamily: "inherit", ...props.style }}
    >
      {props.children}
    </span>
  )
}

export default AC
