'use client';

import { useState, useEffect } from 'react';
import Reticle from './Reticle';
import { HapticPlate, BeautyPlate, IncomingPlate, SketchTile } from './Plates';

const TYPE_LABEL = 'Inter Tight / Geist Mono';

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

function Entry({ idx, title, year, role, stack, status, location, caption, Plate, flip }) {
  return (
    <article className={'entry' + (flip ? ' flip' : '')}>
      <div className="text-card">
        <span className="index">№ {String(idx).padStart(2, '0')}</span>
        <h3>{title}</h3>
        <p className="caption" dangerouslySetInnerHTML={{ __html: caption }} />
        <dl className="credits">
          <dt>Year</dt>
          <dd>{year}</dd>
          <dt>Role</dt>
          <dd>{role}</dd>
          <dt>Stack</dt>
          <dd>{stack}</dd>
          <dt>Status</dt>
          <dd style={{ color: status === 'Live' ? 'var(--accent)' : 'var(--ink-2)' }}>
            {status}
          </dd>
        </dl>
      </div>
      <div className="plate-wrap">
        <Plate />
        <div className="plate-foot">
          <span>{location}</span>
          <span className="fig-num">Fig. {String(idx).padStart(2, '0')}</span>
        </div>
      </div>
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
              52.5200° N, 13.4050° E
            </div>
            <div style={{ marginTop: 8, color: 'var(--accent)' }}>
              <span className="live-dot" />
              Available — Q3 2026
            </div>
          </div>
        </header>

        <div className="sub">
          <p className="lead">
            I build with language models and the systems around them — retrieval, evaluation, the
            slow plumbing that turns a demo into a product. On weekends I write code that draws —
            visuo-haptic experiments, small generative things, the occasional Webflow build for
            friends. This is a working catalogue.
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
            <span className="num">§ 01</span>
            <h2>Selected work</h2>
            <span className="count">04 entries</span>
          </div>

          <Entry
            idx={1}
            title="Visuo-haptic illusions, sampled."
            year="2025 — ongoing"
            role="Research, code, write-up"
            stack="PyMC · NumPy · psychopy · matplotlib"
            status="Live"
            location="Lab notebook · Berlin"
            caption={`A study of perception in the seam between sight and touch — running classical frequentist tests against <b>PyMC</b> posterior sampling on the same dataset and asking which story actually fits. Where MLE collapses ambiguity into a point estimate, Bayesian sampling preserves it; the difference is most of the paper. Field set-up uses a small haptic rig with a vibrotactile coil and a back-projected target.`}
            Plate={HapticPlate}
          />

          <Entry
            idx={2}
            title="A practice site for an aesthetician."
            year="2024"
            role="Design, Webflow build, copy"
            stack="Webflow · GSAP · Cloudinary"
            status="Live"
            location="Client work · Munich"
            caption={`A small Webflow build for an independent skincare practice — soft type, generous white, a booking flow that fits inside one screen. The brief was simply: <b>look expensive without trying</b>. Most of the work happened in the spacing.`}
            Plate={BeautyPlate}
            flip
          />

          <Entry
            idx={3}
            title="Evaluation harness for retrieval agents."
            year="2026 — incoming"
            role="—"
            stack="—"
            status="In progress"
            location="—"
            caption={`A small framework for measuring the things that actually matter in a RAG system — answer faithfulness, citation grounding, latency under load — without the leaderboard theatre. Write-up forthcoming.`}
            Plate={() => <IncomingPlate figNum={3} code="RAG-EVAL" />}
          />

          <Entry
            idx={4}
            title="A weather plate for a kitchen window."
            year="2026 — incoming"
            role="—"
            stack="—"
            status="In progress"
            location="—"
            caption={`A standalone display — e-paper, slow refresh, no chrome — that shows the next twelve hours of light, rain and wind for one window. An exercise in not making another dashboard.`}
            Plate={() => <IncomingPlate figNum={4} code="W-PLATE" />}
            flip
          />
        </section>

        {/* ─── §02 Sketches ──────────────────────────── */}
        <section id="sketches" className="sec">
          <div className="sec-head">
            <span className="num">§ 02</span>
            <h2>Sketches &amp; experiments</h2>
            <span className="count">08 plates</span>
          </div>
          <div className="sketches">
            <SketchTile idx={1} title="Posterior, 8000 draws" kind="dot" />
            <SketchTile idx={2} title="Concentric, breathing" kind="rings" />
            <SketchTile idx={3} title="Cell, magic squares" kind="cells" />
            <SketchTile idx={4} title="Signal, grain" kind="noise" />
            <SketchTile idx={5} title="Field, blue" kind="field" />
            <SketchTile idx={6} title="Type, single glyph" kind="type" />
            <SketchTile idx={7} title="Posterior density" kind="graph" />
            <SketchTile idx={8} title="Strands, 24 of them" kind="lines" />
          </div>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '.04em',
              textTransform: 'uppercase',
              color: 'var(--ink-2)',
              marginTop: 28,
              maxWidth: '62ch',
            }}
          >
            Most of these are p5 / d3 / svg one-pagers — code lives in a scratch repo, ask if
            you&apos;d like the source.
          </p>
        </section>

        {/* ─── §03 Experience ───────────────────────── */}
        <section id="experience" className="sec">
          <div className="sec-head">
            <span className="num">§ 03</span>
            <h2>Experience</h2>
            <span className="count">04 posts</span>
          </div>
          <div className="ledger">
            <LedgerRow
              range="<b>2024</b> — present"
              role="Senior AI Engineer"
              org="Independent / contract"
              location="Berlin · remote"
              type="Full-time"
              blurb="Building retrieval-augmented systems, evaluation harnesses and the unglamorous plumbing between LLMs and production. Clients in fintech, health-tech and one stubborn cultural institution."
              tags={['LLM', 'RAG', 'Evals', 'Python', 'TypeScript']}
            />
            <LedgerRow
              range="<b>2022</b> — 2024"
              role="Machine Learning Engineer"
              org="Hyperion Labs"
              location="Munich"
              type="Full-time"
              blurb="Owned the training pipeline for a vision-language model in a heavily-regulated domain. Most of the work was data: deduplication, labelling protocols, evals that survived a year of regression."
              tags={['VLM', 'PyTorch', 'Triton', 'MLOps']}
            />
            <LedgerRow
              range="<b>2020</b> — 2022"
              role="Research Engineer"
              org="Max-Planck Institute for Cognitive Sciences"
              location="Leipzig"
              type="Research"
              blurb="Bayesian models of multisensory perception. Co-author on two papers; wrote most of the simulation code in PyMC and the figures in matplotlib."
              tags={['PyMC', 'Bayesian', 'Psychophysics']}
            />
            <LedgerRow
              range="<b>2019</b> — 2020"
              role="Software Engineer, intern"
              org="Kabuki Studio"
              location="Berlin"
              type="Internship"
              blurb="Generative graphics for a small studio doing live visuals — TouchDesigner, GLSL shaders, and the occasional Webflow build. Where the creative-coding habit started."
              tags={['TouchDesigner', 'GLSL', 'Webflow']}
            />
          </div>
        </section>

        {/* ─── §04 Education ────────────────────────── */}
        <section id="education" className="sec">
          <div className="sec-head">
            <span className="num">§ 04</span>
            <h2>Education</h2>
            <span className="count">03 entries</span>
          </div>
          <div className="ledger">
            <LedgerRow
              range="<b>2020</b> — 2022"
              role="M.Sc. Computational Neuroscience"
              org="Technische Universität Berlin"
              location="Berlin"
              type="Distinction"
              blurb="Thesis: Bayesian models of visuo-haptic integration under conflict. Supervised by Prof. K. Reinhardt. Side modules in computer graphics and probabilistic programming."
              tags={['Bayesian inference', 'Neuroscience', 'PyMC']}
            />
            <LedgerRow
              range="<b>2016</b> — 2019"
              role="B.Sc. Computer Science"
              org="University of Hamburg"
              location="Hamburg"
              type="1.3 / 1.0"
              blurb="Concentration in machine learning and human-computer interaction. Bachelor project: a real-time visual sequencer for an installation at Reeperbahn Festival."
              tags={['ML', 'HCI', 'C++', 'Three.js']}
            />
            <LedgerRow
              range="2018"
              role="Visiting student, Department of Design"
              org="Aalto University"
              location="Helsinki"
              type="Exchange"
              blurb="One semester across the bridge into design. Took typography, generative form, and a studio in interaction prototyping. Most of my visual instincts come from those four months."
              tags={['Type', 'Generative form']}
            />
          </div>
        </section>

        {/* ─── §05 Contact ───────────────────────────── */}
        <section id="contact" className="sec" style={{ marginBottom: 0 }}>
          <div className="sec-head">
            <span className="num">§ 05</span>
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
