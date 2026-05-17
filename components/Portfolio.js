'use client';

import { useState, useEffect } from 'react';
import Reticle from './Reticle';

import { WORK_ENTRIES } from '../data/projects';
import { EXPERIENCE_ENTRIES } from '../data/experience';
import { EDUCATION_ENTRIES } from '../data/education';

const SECTIONS = ['work', 'sketches', 'experience', 'education', 'contact'];
const secNum = (id) => `§ ${String(SECTIONS.indexOf(id) + 1).padStart(2, '0')}`;
const fmt = (n, label = 'entries') => `${String(n).padStart(2, '0')} ${label}`;


function useLiveClock() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function LedgerRow({ range, role, org, location, type, blurb, tags }) {
  return (
    <div className="ledger-row">
      <div className="l-range" dangerouslySetInnerHTML={{ __html: range }} />
      <div className="l-main">
        <h4 className="l-role">{role}</h4>
        {org && <p className="l-org">{org}</p>}
        {blurb && <p className="l-blurb">{blurb}</p>}
        {tags && tags.length > 0 && (
          <div className="l-tags">
            {tags.map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        )}
      </div>
      <div className="l-meta">
        {location && <span className="l-loc">{location}</span>}
        {type && <span className="l-type">{type}</span>}
      </div>
    </div>
  );
}

function Entry({ idx, title, year, role, stack, status, location, caption, Plate, href }) {
  const [hovered, setHovered] = useState(false);
  const padded = String(idx).padStart(2, '0');
  const Card = href ? 'a' : 'div';
  const cardProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <article className="entry inset">
      <Card
        className="inset-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...cardProps}
      >
        <div className="index-row">
          <span>№ {padded} — {year}</span>
          {href
            ? <span className="link-hint">View ↗</span>
            : <b style={{ color: status === 'Live' ? 'var(--accent)' : 'var(--ink-2)' }}>{status}</b>
          }
        </div>
        <div className="inset-banner">
          <div className="plate-wrap">
            <Plate hovered={hovered} />
          </div>
          <div className="inset-banner-foot">
            <span>{location}</span>
            <span>Fig. {padded}</span>
          </div>
        </div>
        <div className="inset-body">
          <div>
            <h3>{title}</h3>
            <p className="caption" dangerouslySetInnerHTML={{ __html: caption }} />
          </div>
          <dl className="credits">
            <dt>Role</dt>
            <dd>{role}</dd>
            <dt>Stack</dt>
            <dd>{stack}</dd>
          </dl>
        </div>
      </Card>
    </article>
  );
}

export default function Portfolio() {
  const now = useLiveClock();

  const dateStr = now
    ? now
        .toLocaleDateString('en-GB', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
        .toUpperCase()
    : '';
  const timeStr = now
    ? now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '';

  return (
    <>
      <Reticle kind="dot" />
      <div className="shell">
        {/* ─── Masthead ─────────────────────────────── */}
        <header className="mast">
          <h1>
            Nargiz A.<span className="accent">,</span>
            <br />
            AI Engineer<span className="accent">.</span>
          </h1>
          <div className="meta">
            <div>
              <b>Index №&nbsp;01</b> · Ed. 2026
            </div>
            {now && <div>{dateStr}</div>}
            <div>
              {timeStr}
              {timeStr && ' · '}
              51.5136° N, 7.4653° E
            </div>
            <div style={{ marginTop: 8, color: 'var(--accent)' }}>
              <span className="live-dot" />
              Available
            </div>
          </div>
        </header>

        <div className="sub">
          <h3>Human × Machine × Perception.</h3>
          <p className="lead">
            I build AI and build with AI. My work explores how people interact with, understand, and experience intelligent systems.
          </p>
          <nav>
            <a href="#work">§ Work</a>
            <a href="#sketches">§ Sketches</a>
            <a href="#experience">§ Experience</a>
            <a href="#education">§ Education</a>
            <a href="#contact">§ Contact</a>
          </nav>
        </div>

        {/* ─── §01 Selected work ─────────────────────── */}
        <section id="work" className="sec">
          <div className="sec-head">
            <span className="num">{secNum('work')}</span>
            <h2>Selected work</h2>
            <span className="count">{fmt(WORK_ENTRIES.length)}</span>
          </div>
          <div className="work-grid">
            {WORK_ENTRIES.map((e, i) => (
              <Entry key={i} idx={i + 1} {...e} />
            ))}
          </div>
        </section>

        {/* ─── §02 Sketches ──────────────────────────── */}
        <section id="sketches" className="sec">
          <div className="sec-head">
            <span className="num">{secNum('sketches')}</span>
            <h2>Sketches &amp; experiments</h2>
            <span className="count">— pending</span>
          </div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--ink-2)', maxWidth: '62ch' }}>
            Stitching this together — come back later.
          </p>
        </section>

        {/* ─── §03 Experience ───────────────────────── */}
        <section id="experience" className="sec">
          <div className="sec-head">
            <span className="num">{secNum('experience')}</span>
            <h2>Experience</h2>
            <span className="count">{fmt(EXPERIENCE_ENTRIES.length, 'posts')}</span>
          </div>
          <div className="ledger">
            {EXPERIENCE_ENTRIES.map((e, i) => (
              <LedgerRow key={i} {...e} />
            ))}
          </div>
        </section>

        {/* ─── §04 Education ────────────────────────── */}
        <section id="education" className="sec">
          <div className="sec-head">
            <span className="num">{secNum('education')}</span>
            <h2>Education</h2>
            <span className="count">{fmt(EDUCATION_ENTRIES.length)}</span>
          </div>
          <div className="ledger">
            {EDUCATION_ENTRIES.map((e, i) => (
              <LedgerRow key={i} {...e} />
            ))}
          </div>
        </section>

        {/* ─── §05 Contact ───────────────────────────── */}
        <section id="contact" className="sec" style={{ marginBottom: 0 }}>
          <div className="sec-head">
            <span className="num">{secNum('contact')}</span>
            <h2>Get in touch</h2>
            <span className="count">colophon</span>
          </div>
          <div className="colophon">
            <div className="col">
              <h4>
                Availability
                <br />
                <span className="accent"></span>
              </h4>
              <p>
                Open to small, well-scoped engagements.
              </p>
            </div>

            <div className="col">
              <h4>Reach me</h4>
              <ul>
                <li>
                  <a href="mailto:hello@nargiz.studio">nargizaskarbekkyzy@gmail.com</a>
                </li>
                <li>
                  <a href="https://github.com/nargizas" target="_blank" rel="noopener noreferrer">
                    @nargizas on github
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/nargiz-as/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin
                  </a>
                </li>
              </ul>
            </div>

            <div className="col">
              <h4>Currently</h4>
              <ul>
                <li>Reading — Stories of Your Life and Others, Ted Chiang</li>
                <li>Listening — Heavy Serenade, NMIXX</li>
                <li>Sitting in — Dortmund, DE</li>
              </ul>
            </div>
          </div>

          <footer className="foot">
            <div>© Nargiz A. — 2026</div>
            <div className="right">
              № 0002 / Edition of <b>∞</b>
            </div>
          </footer>
        </section>
      </div>
    </>
  );
}
