import { site } from "../data/site";

// Illustrated stand-ins for photos. They use the same colour tokens as the
// page, so they follow the day/night theme. Replace with real photos via
// src/data/site.js whenever they are ready.

const ROWS = [
  { y: 176, s: 0.52 },
  { y: 204, s: 0.68 },
  { y: 238, s: 0.86 },
  { y: 280, s: 1.08 },
];

function DeskRows({ accent, seats = 6 }) {
  return (
    <g>
      {ROWS.map(({ y, s }, r) => {
        const w = 350 * s;
        const x0 = 200 - w / 2;
        const seatW = w / seats;
        return (
          <g key={r}>
            {Array.from({ length: seats }, (_, i) => (
              <rect
                key={`p${i}`}
                x={x0 + i * seatW + 2 * s}
                y={y - 40 * s}
                width={seatW - 4 * s}
                height={26 * s}
                rx={3 * s}
                fill={accent}
                opacity="0.55"
              />
            ))}
            <rect x={x0} y={y - 14 * s} width={w} height={14 * s} rx={2 * s} fill="var(--surface)" />
            <rect x={x0} y={y} width={w} height={10 * s} fill="var(--line)" />
            {Array.from({ length: seats }, (_, i) =>
              (i + r) % 3 === 0 ? (
                <rect
                  key={`b${i}`}
                  x={x0 + i * seatW + seatW * 0.3}
                  y={y - 22 * s}
                  width={seatW * 0.28}
                  height={8 * s}
                  rx={1.5 * s}
                  fill={i % 2 ? "var(--lamp)" : "var(--leaf)"}
                />
              ) : null
            )}
            {Array.from({ length: seats }, (_, i) => (
              <rect
                key={`c${i}`}
                x={x0 + i * seatW + seatW / 2 - 9 * s}
                y={y + 12 * s}
                width={18 * s}
                height={16 * s}
                rx={5 * s}
                fill="var(--ink)"
                opacity="0.78"
              />
            ))}
          </g>
        );
      })}
    </g>
  );
}

function Room({ children }) {
  return (
    <>
      <rect width="400" height="300" fill="var(--wall)" />
      <rect y="186" width="400" height="114" fill="var(--wall-deep)" />
      <rect y="184" width="400" height="4" fill="var(--line)" />
      <rect x="150" y="14" width="100" height="7" rx="3.5" fill="var(--surface)" />
      <ellipse cx="200" cy="30" rx="120" ry="26" fill="var(--surface)" opacity="0.25" />
      {children}
    </>
  );
}

function Window({ x = 36, y = 44 }) {
  return (
    <g>
      <rect x={x} y={y} width="84" height="74" rx="6" fill="var(--surface)" opacity="0.75" />
      <path d={`M${x + 42} ${y}v74M${x} ${y + 37}h84`} stroke="var(--wall-deep)" strokeWidth="4" />
    </g>
  );
}

function Scooter({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="24" r="10" fill="none" stroke="var(--ink)" strokeWidth="5" />
      <circle cx="52" cy="24" r="10" fill="none" stroke="var(--ink)" strokeWidth="5" />
      <path d="M6 18c4-14 14-18 30-18h8l10 18" fill="var(--seat-fan)" stroke="var(--ink)" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M14 -2h18" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
      <path d="M44 0l5-22h9" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

const scenes = {
  hall: () => (
    <Room>
      <Window />
      <Window x={280} />
      <DeskRows accent="var(--seat-fan)" />
    </Room>
  ),
  ac: () => (
    <Room>
      <rect x="244" y="46" width="118" height="36" rx="9" fill="var(--surface)" stroke="var(--line)" strokeWidth="2" />
      <path d="M256 72h94" stroke="var(--line)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="350" cy="58" r="3" fill="var(--seat-ac)" />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${262 + i * 36} 92q6 8 0 16t0 16`}
          stroke="var(--seat-ac)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
      ))}
      <Window />
      <DeskRows accent="var(--seat-ac)" />
    </Room>
  ),
  fan: () => (
    <Room>
      <g transform="translate(290 16)">
        <path d="M0 0v22" stroke="var(--ink)" strokeWidth="3" />
        <ellipse cx="-34" cy="26" rx="32" ry="6" fill="var(--ink)" opacity="0.75" />
        <ellipse cx="34" cy="26" rx="32" ry="6" fill="var(--ink)" opacity="0.75" />
        <circle cx="0" cy="25" r="8" fill="var(--surface)" stroke="var(--ink)" strokeWidth="3" />
      </g>
      <Window />
      <DeskRows accent="var(--seat-fan)" seats={5} />
    </Room>
  ),
  desk: () => (
    <>
      <rect width="400" height="300" fill="var(--wall)" />
      <rect x="0" y="40" width="400" height="160" fill="var(--seat-ac)" opacity="0.35" />
      <path d="M0 196 L400 178 V300 H0Z" fill="var(--surface)" />
      <path d="M0 196 L400 178" stroke="var(--line)" strokeWidth="4" />
      {/* lamp */}
      <circle cx="300" cy="96" r="70" fill="var(--lamp)" opacity="0.22" />
      <path d="M340 184l-18-70 -34 -10" stroke="var(--ink)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M262 92l38 -12 8 26z" fill="var(--ink)" />
      <ellipse cx="340" cy="186" rx="24" ry="6" fill="var(--ink)" />
      {/* books */}
      <rect x="40" y="150" width="110" height="18" rx="3" fill="var(--leaf)" />
      <rect x="48" y="132" width="98" height="18" rx="3" fill="var(--lamp)" />
      <rect x="44" y="114" width="104" height="18" rx="3" fill="var(--ink)" opacity="0.8" />
      {/* notebook */}
      <path d="M150 262l52-60 60 8-40 70z" fill="var(--bg)" stroke="var(--line)" strokeWidth="3" strokeLinejoin="round" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${176 + i * 8} ${238 - i * 9}l36 5`} stroke="var(--seat-ac)" strokeWidth="3" strokeLinecap="round" />
      ))}
      <path d="M232 262l40-52" stroke="var(--stamp)" strokeWidth="6" strokeLinecap="round" />
      {/* water bottle */}
      <rect x="92" y="186" width="30" height="74" rx="10" fill="var(--seat-ac)" opacity="0.85" />
      <rect x="98" y="176" width="18" height="12" rx="3" fill="var(--ink)" />
    </>
  ),
  entrance: () => (
    <>
      <rect width="400" height="300" fill="var(--wall)" />
      <rect y="232" width="400" height="68" fill="var(--wall-deep)" />
      <rect x="112" y="30" width="176" height="30" rx="8" fill="var(--leaf)" />
      <text x="200" y="51" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--on-leaf)" fontFamily="inherit">
        {site.name}
      </text>
      <rect x="148" y="74" width="104" height="150" rx="6" fill="var(--ink)" opacity="0.85" />
      <path d="M200 74v150" stroke="var(--wall)" strokeWidth="3" />
      <circle cx="190" cy="152" r="3.5" fill="var(--lamp)" />
      <circle cx="210" cy="152" r="3.5" fill="var(--lamp)" />
      <rect x="136" y="224" width="128" height="10" rx="2" fill="var(--line)" />
      <Window x={24} y={84} />
      <path d="M0 290h400" stroke="var(--line)" strokeWidth="3" strokeDasharray="18 14" />
      <Scooter x={300} y={244} s={0.9} />
      <g transform="translate(346 150)">
        <path d="M10 86V26" stroke="var(--muted)" strokeWidth="4" />
        <rect width="22" height="26" rx="5" fill="var(--leaf)" />
        <text x="11" y="19" textAnchor="middle" fontSize="17" fontWeight="800" fill="var(--on-leaf)" fontFamily="inherit">
          P
        </text>
      </g>
    </>
  ),
};

export default function HallScene({ scene = "hall", title }) {
  const Scene = scenes[scene] || scenes.hall;
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={`Illustration: ${title}`}
    >
      <Scene />
    </svg>
  );
}
