const ANGLES = [0, 72, 144, 216, 288];

export default function Rose({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="-100 -100 200 200"
      role="img"
      aria-label="A wild rose in bloom"
      className={`rose ${className}`}
    >
      {ANGLES.map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <ellipse
            className="petal"
            cx="0"
            cy="-48"
            rx="36"
            ry="50"
            fill="#d94c7e"
          />
          <ellipse
            className="petal"
            cx="0"
            cy="-52"
            rx="20"
            ry="34"
            fill="#e8799f"
            opacity="0.7"
          />
          <path
            d="M0 -14 V-70"
            stroke="#b83a68"
            strokeWidth="1.2"
            opacity="0.5"
          />
        </g>
      ))}
      <circle r="14" fill="#f2b84b" />
      {Array.from({ length: 18 }, (_, i) => {
        const t = (i / 18) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={Math.cos(t) * 20}
            cy={Math.sin(t) * 20}
            r="2"
            fill="#e8603c"
          />
        );
      })}
    </svg>
  );
}
