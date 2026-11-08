import { useEffect, useState, type CSSProperties } from "react";

const MIN_LOGO_SIZE = 30;
const MAX_LOGO_SIZE = 56;
const DIAGONAL_SPACING_FACTOR = 3;
const MIN_DIAGONAL_SPACING = 72;
const DIAGONAL_OVERSCAN = 7;

function getLaneLayout() {
  const logoSize = Math.min(
    MAX_LOGO_SIZE,
    Math.max(MIN_LOGO_SIZE, window.innerWidth * 0.044),
  );
  const spacing = Math.max(
    MIN_DIAGONAL_SPACING,
    logoSize * DIAGONAL_SPACING_FACTOR,
  );

  return {
    laneCount: Math.ceil(window.innerHeight / spacing) + DIAGONAL_OVERSCAN,
    spacing,
  };
}

export default function LogoBackground() {
  const [layout, setLayout] = useState(getLaneLayout);

  useEffect(() => {
    let frame = 0;
    const updateLayout = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setLayout(getLaneLayout()));
    };

    window.addEventListener("resize", updateLayout);
    return () => {
      window.removeEventListener("resize", updateLayout);
      cancelAnimationFrame(frame);
    };
  }, []);

  const center = (layout.laneCount - 1) / 2;

  return (
    <div className="logo-field" aria-hidden="true">
      {Array.from({ length: layout.laneCount }, (_, lane) => {
        const variation = lane % 7;
        return (
          <div
            key={lane}
            className="logo-lane"
            style={
              {
                "--lane-index": lane,
                "--lane-offset": `${(lane - center) * layout.spacing}px`,
                "--lane-duration": `${10 + variation * 1.2}s`,
                "--lane-delay": `${lane * -2.3}s`,
                "--lane-bob-duration": `${6.5 + variation * 0.65}s`,
                "--lane-bob-delay": `${lane * -0.8}s`,
              } as CSSProperties
            }
          >
            <div className="logo-lane__track" />
          </div>
        );
      })}
    </div>
  );
}
