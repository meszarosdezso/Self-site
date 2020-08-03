const Corner: React.FC<{ color: string; style?: React.CSSProperties }> = ({
  color = "#FFFFFF",
  style,
}) => {
  const lineStyle: React.CSSProperties = {
    width: "5rem",
    height: "3px",
    background: color,
  }

  return (
    <div className="Corner" style={{ position: "absolute", ...style }}>
      <div
        style={{
          ...lineStyle,
          transform: `rotate(90deg) translate(50%, -50%)`,
          position: "absolute",
          left: 0,
        }}
        className="vertical"
      ></div>
      <div
        style={{ ...lineStyle, transform: `translate(50%, 0%)` }}
        className="horizontal"
      ></div>
    </div>
  )
}

export default Corner
