export default function Gauge({ percent, label, color = "#aaa" }: { percent: number; label: string; color?: string }) {
  return (
    <div
      style={{
        alignItems: "center",
        border: "1px solid #333",
        borderRadius: "5px",
        display: "flex",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: color,
          color: "black",
          fontSize: "0.8rem",
          overflow: "hidden",
          paddingLeft: "1rem",
          position: "relative",
          width: `${percent}%`,
        }}
      >
        {label.toUpperCase()}
        <br />
        {`${percent.toFixed(0)} %`}
      </div>
    </div>
  )
}
