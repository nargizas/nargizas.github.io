'use client';

import { useEffect, useRef } from 'react';

export function HapticPlate({ hovered }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (hovered) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [hovered]);

  return (
    <div className="plate">
      <svg
        ref={svgRef}
        viewBox="0 0 400 460"
        preserveAspectRatio="xMidYMid slice"
        style={{ background: 'var(--accent)' }}
      >
        <defs>
          <radialGradient id="hp-glow" cx="50%" cy="55%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <rect width="400" height="460" fill="url(#hp-glow)" />
        <g fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1">
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={70 + i * 87} cy={230} r={90}>
              <animate
                attributeName="r"
                values="86;94;86"
                dur={`${7 + i * 0.6}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <circle key={'b' + i} cx={70 + i * 87} cy={230} r={60} opacity=".4">
              <animate
                attributeName="r"
                values="58;66;58"
                dur={`${9 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
        <g stroke="rgba(255,255,255,.6)" strokeWidth="1">
          <line x1="195" y1="230" x2="205" y2="230" />
          <line x1="200" y1="225" x2="200" y2="235" />
        </g>
        <g stroke="rgba(255,255,255,.45)" strokeWidth="1">
          <line x1="12" y1="12" x2="22" y2="12" />
          <line x1="12" y1="12" x2="12" y2="22" />
          <line x1="388" y1="12" x2="378" y2="12" />
          <line x1="388" y1="12" x2="388" y2="22" />
          <line x1="12" y1="448" x2="22" y2="448" />
          <line x1="12" y1="448" x2="12" y2="438" />
          <line x1="388" y1="448" x2="378" y2="448" />
          <line x1="388" y1="448" x2="388" y2="438" />
        </g>
        <g
          fontFamily="var(--mono)"
          fontSize="9"
          fill="rgba(255,255,255,.7)"
          style={{ letterSpacing: '.06em', textTransform: 'uppercase' }}
        >
          <text x="14" y="32">Fig. 01 / Haptic field</text>
          <text x="14" y="450" textAnchor="start">d=0.42  σ=0.11</text>
          <text x="386" y="450" textAnchor="end">N=4000 samples</text>
        </g>
      </svg>
    </div>
  );
}

export function BeautyPlate({ hovered }) {
  const playState = hovered ? 'running' : 'paused';
  return (
    <div className="plate" style={{ background: 'var(--paper-2)' }}>
      <svg viewBox="0 0 400 460" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="460" fill="var(--paper-2)" />
        <g style={{ transformOrigin: '200px 230px', animation: `spin 60s linear infinite`, animationPlayState: playState }}>
          <ellipse cx="200" cy="230" rx="150" ry="60" fill="none" stroke="var(--ink)" strokeWidth="1" opacity=".6" />
          <ellipse cx="200" cy="230" rx="120" ry="48" fill="none" stroke="var(--ink)" strokeWidth="1" opacity=".5" />
          <ellipse cx="200" cy="230" rx="90" ry="36" fill="none" stroke="var(--ink)" strokeWidth="1" opacity=".4" />
          <ellipse cx="200" cy="230" rx="60" ry="24" fill="none" stroke="var(--ink)" strokeWidth="1" opacity=".3" />
        </g>
        <g style={{ transformOrigin: '200px 230px', animation: `spin-rev 80s linear infinite`, animationPlayState: playState }}>
          <ellipse cx="200" cy="230" rx="150" ry="60" transform="rotate(60 200 230)" fill="none" stroke="var(--ink)" strokeWidth="1" opacity=".4" />
          <ellipse cx="200" cy="230" rx="120" ry="48" transform="rotate(60 200 230)" fill="none" stroke="var(--ink)" strokeWidth="1" opacity=".3" />
        </g>
        <circle cx="200" cy="230" r="2.5" fill="var(--accent)" />
        <g stroke="var(--ink)" strokeWidth="1" opacity=".7">
          <line x1="12" y1="12" x2="22" y2="12" />
          <line x1="12" y1="12" x2="12" y2="22" />
          <line x1="388" y1="12" x2="378" y2="12" />
          <line x1="388" y1="12" x2="388" y2="22" />
          <line x1="12" y1="448" x2="22" y2="448" />
          <line x1="12" y1="448" x2="12" y2="438" />
          <line x1="388" y1="448" x2="378" y2="448" />
          <line x1="388" y1="448" x2="388" y2="438" />
        </g>
        <g
          fontFamily="var(--mono)"
          fontSize="9"
          fill="var(--ink-2)"
          style={{ letterSpacing: '.06em', textTransform: 'uppercase' }}
        >
          <text x="14" y="32">Fig. 02 / Form study</text>
          <text x="386" y="450" textAnchor="end">CMYK 0 / 0 / 0 / 100</text>
        </g>
      </svg>
    </div>
  );
}

export function IncomingPlate({ figNum = 3, code = 'TBA' }) {
  return (
    <div className="plate" style={{ background: 'var(--paper-2)' }}>
      <svg viewBox="0 0 400 460" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern
            id={`hatch-${figNum}`}
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="8" stroke="var(--ink)" strokeWidth=".5" opacity=".18" />
          </pattern>
        </defs>
        <rect width="400" height="460" fill={`url(#hatch-${figNum})`} />
        <text
          x="200"
          y="240"
          textAnchor="middle"
          fontFamily="var(--sans)"
          fontWeight="500"
          fontSize="120"
          fill="var(--ink)"
          opacity=".88"
          style={{ letterSpacing: '-.04em' }}
        >
          {String(figNum).padStart(2, '0')}
        </text>
        <line x1="80" y1="280" x2="320" y2="280" stroke="var(--ink)" strokeWidth="1" opacity=".5" />
        <text
          x="200"
          y="305"
          textAnchor="middle"
          fontFamily="var(--mono)"
          fontSize="11"
          fill="var(--ink-2)"
          style={{ letterSpacing: '.12em', textTransform: 'uppercase' }}
        >
          Incoming · {code}
        </text>
        <g stroke="var(--ink)" strokeWidth="1" opacity=".7">
          <line x1="12" y1="12" x2="22" y2="12" />
          <line x1="12" y1="12" x2="12" y2="22" />
          <line x1="388" y1="12" x2="378" y2="12" />
          <line x1="388" y1="12" x2="388" y2="22" />
          <line x1="12" y1="448" x2="22" y2="448" />
          <line x1="12" y1="448" x2="12" y2="438" />
          <line x1="388" y1="448" x2="378" y2="448" />
          <line x1="388" y1="448" x2="388" y2="438" />
        </g>
        <g
          fontFamily="var(--mono)"
          fontSize="9"
          fill="var(--ink-2)"
          style={{ letterSpacing: '.06em', textTransform: 'uppercase' }}
        >
          <text x="14" y="32">Fig. {String(figNum).padStart(2, '0')} / Forthcoming</text>
        </g>
      </svg>
    </div>
  );
}

function NoiseTile() {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const w = (c.width = 300);
    const h = (c.height = 300);
    let raf;
    let t = 0;
    function draw() {
      const img = ctx.createImageData(w, h);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = 240 - Math.random() * 80;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      ctx.fillStyle = 'rgba(27,43,255,.18)';
      const y = Math.sin(t * 0.02) * 80 + 150;
      ctx.fillRect(0, y, w, 2);
      t++;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} style={{ width: '100%', height: '100%' }} />;
}

function RingsTile() {
  return (
    <svg viewBox="0 0 100 100" style={{ background: 'var(--paper-2)' }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <circle key={i} cx="50" cy="50" r={i * 7 + 4} fill="none" stroke="var(--ink)" strokeWidth=".4" opacity={1 - i * 0.12}>
          <animate
            attributeName="r"
            values={`${i * 7 + 4};${i * 7 + 6};${i * 7 + 4}`}
            dur={`${4 + i * 0.4}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
      <circle cx="50" cy="50" r="1.2" fill="var(--accent)" />
    </svg>
  );
}

function FieldTile() {
  return (
    <svg viewBox="0 0 100 100" style={{ background: 'var(--accent)' }}>
      {Array.from({ length: 64 }).map((_, i) => {
        const x = (i % 8) * 12 + 8;
        const y = Math.floor(i / 8) * 12 + 8;
        return (
          <circle key={i} cx={x} cy={y} r=".9" fill="rgba(255,255,255,.85)">
            <animate
              attributeName="r"
              values=".6;1.3;.6"
              dur={`${3 + (i % 5) * 0.3}s`}
              begin={`${(i * 0.07) % 2}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
    </svg>
  );
}

function TypeTile() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--paper-2)',
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--sans)',
          fontWeight: 500,
          fontSize: 'min(48vh, 220px)',
          letterSpacing: '-.05em',
          color: 'var(--ink)',
          lineHeight: 1,
          transform: 'translate(8%, 6%)',
        }}
      >
        Aa
      </span>
    </div>
  );
}

function GraphTile() {
  return (
    <svg viewBox="0 0 100 100" style={{ background: 'var(--paper-2)' }}>
      <line x1="10" y1="90" x2="90" y2="90" stroke="var(--ink)" strokeWidth=".5" />
      <line x1="10" y1="10" x2="10" y2="90" stroke="var(--ink)" strokeWidth=".5" />
      <path
        d="M10,82 Q30,82 38,60 T55,30 Q65,28 70,55 T90,84"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.2"
      />
      <path
        d="M10,84 Q34,84 42,72 T62,52 Q72,52 76,70 T90,86"
        fill="none"
        stroke="var(--ink)"
        strokeWidth=".8"
        opacity=".55"
        strokeDasharray="2 2"
      />
      <line x1="52" y1="20" x2="52" y2="90" stroke="var(--ink)" strokeWidth=".5" strokeDasharray="1 2" />
      <text
        x="54"
        y="20"
        fontFamily="var(--mono)"
        fontSize="4"
        fill="var(--ink-2)"
        style={{ letterSpacing: '.06em' }}
      >
        μ
      </text>
    </svg>
  );
}

function LinesTile() {
  return (
    <svg viewBox="0 0 100 100" style={{ background: 'var(--paper-2)' }}>
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={i}
          x1={i * 4 + 2}
          y1="10"
          x2={i * 4 + 2}
          y2="90"
          stroke="var(--ink)"
          strokeWidth=".5"
          opacity={0.2 + Math.abs(Math.sin(i * 0.8)) * 0.6}
        >
          <animate
            attributeName="y2"
            values={`${90 - Math.abs(Math.sin(i)) * 30};90;${90 - Math.abs(Math.sin(i)) * 30}`}
            dur={`${5 + (i % 5) * 0.3}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}
    </svg>
  );
}

function CellsTile() {
  return (
    <svg viewBox="0 0 100 100" style={{ background: 'var(--paper-2)' }}>
      {Array.from({ length: 9 }).map((_, i) => {
        const c = (i % 3) * 30 + 12;
        const r = Math.floor(i / 3) * 30 + 12;
        const filled = [0, 4, 8].includes(i);
        return (
          <rect
            key={i}
            x={c}
            y={r}
            width="24"
            height="24"
            fill={filled ? 'var(--accent)' : 'none'}
            stroke="var(--ink)"
            strokeWidth=".5"
          />
        );
      })}
    </svg>
  );
}

function DotsTile() {
  const dots = Array.from({ length: 220 }).map((_, i) => {
    const a = ((i * 2.399963) % (Math.PI * 2));
    const r = Math.sqrt(((i * 1.618) % 1) + 0.01) * 28;
    const x = 50 + Math.cos(a) * r;
    const y = 50 + Math.sin(a) * r * 0.7;
    return { x, y };
  });
  return (
    <svg viewBox="0 0 100 100" style={{ background: 'var(--paper-2)' }}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r=".7" fill="var(--ink)" opacity=".6" />
      ))}
      <circle cx="50" cy="50" r="1.5" fill="var(--accent)" />
    </svg>
  );
}

export function SketchTile({ idx, title, kind }) {
  return (
    <div className="sketch">
      {kind === 'noise' && <NoiseTile />}
      {kind === 'rings' && <RingsTile />}
      {kind === 'field' && <FieldTile />}
      {kind === 'type' && <TypeTile />}
      {kind === 'graph' && <GraphTile />}
      {kind === 'lines' && <LinesTile />}
      {kind === 'cells' && <CellsTile />}
      {kind === 'dot' && <DotsTile />}
      <span className="idx">{String(idx).padStart(2, '0')}</span>
      <span className="label">{title}</span>
    </div>
  );
}
