'use client';

import { useEffect, useRef, useState } from 'react';

export default function Reticle({ kind }) {
  const ref = useRef();
  const readRef = useRef();
  const [hot, setHot] = useState(false);

  useEffect(() => {
    function move(e) {
      const r = ref.current;
      if (!r) return;
      if (kind === 'coords') {
        r.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 14}px)`;
      } else {
        r.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      if (readRef.current) {
        const x = String(e.clientX).padStart(4, '0');
        const y = String(e.clientY).padStart(4, '0');
        readRef.current.textContent = `X ${x}  Y ${y}`;
      }
    }
    function over(e) {
      const t = e.target;
      const hover =
        t.closest && t.closest('a, button, .text-card, .inset-card, .sketch, .plate-wrap, .ledger-row');
      setHot(!!hover);
    }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [kind]);

  if (kind === 'system') return null;

  const cls = 'reticle ' + kind + (hot ? ' hot' : '');
  const readout =
    kind === 'dot' || kind === 'ring' || kind === 'regmark' ? null : (
      <span ref={readRef} className="readout">
        X 0000&nbsp;&nbsp;Y 0000
      </span>
    );

  if (kind === 'regmark')
    return (
      <div ref={ref} className={cls}>
        <span className="ring" />
      </div>
    );
  if (kind === 'halo')
    return (
      <div ref={ref} className={cls}>
        <span className="ring outer" />
        <span className="ring inner" />
        {readout}
      </div>
    );
  return <div ref={ref} className={cls}>{readout}</div>;
}
