import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react';
import { steps } from '../content/site';
import { useLocale } from '../localization/Locale';
import { Eyebrow } from '../components/UI';
export function KitchenDrawing({ stage = 3 }: { stage?: number }) {
  const { t } = useLocale();
  return (
    <svg
      className={`kitchen-drawing stage-${stage}`}
      viewBox="0 0 600 450"
      role="img"
      aria-label={t('رسم تصوّري لمطبخ', 'Conceptual kitchen line drawing')}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        <path opacity=".2" d="M40 390h520M40 390V60h520v330M30 410h540M60 40v370M540 40v370" />
        <g className="drawing-measure">
          <path d="M80 65h440m-440-8v16m440-16v16M80 410h440" strokeDasharray="4 5" />
          <path d="M34 110v240m-5-240h10m-10 240h10" />
        </g>
        <g className="drawing-cabinets">
          <path d="M80 100h440v110H80zM80 245h440v115H80zM80 245v-12h440v12M80 245h440M190 100v110m110-110v110m110-110v110M190 245v115m110-115v115m110-115v115" />
          <path d="M89 110h92v90H89zm110 0h92v90h-92zm110 0h92v90h-92zm110 0h92v90h-92z" />
          <path d="M130 255h16m94 0h16m94 0h16m94 0h16M140 225v-20q0-18 17-18t17 18v7M120 233h75" />
          <path d="M315 247h84v103h-84zm8 22h68v65h-68" />
          <circle cx="330" cy="258" r="2" />
          <circle cx="341" cy="258" r="2" />
        </g>
        <g className="drawing-island">
          <path d="M145 310h310v18H145zM159 328h282v69H159zM253 328v69m94-69v69" />
          <path d="M159 397v10m282-10v10" />
        </g>
        <g className="drawing-light">
          <path d="M210 40v70m-26 0h52l10 18h-72zm180-70v70m-26 0h52l10 18h-72z" />
          <path stroke="#eead59" strokeWidth="4" d="M82 214h436" />
        </g>
      </g>
    </svg>
  );
}
export function ProcessStory({ compact = false }: { compact?: boolean }) {
  const { t, pick } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  useMotionValueEvent(scrollYProgress, 'change', (value) =>
    setActive(Math.min(3, Math.floor(value * 4))),
  );
  return (
    <section ref={ref} className={`process-story ${compact ? 'process-compact' : ''}`}>
      <div className="container process-grid">
        <div className="process-visual">
          <Eyebrow>{t('من الفكرة إلى الحياة', 'FROM IDEA TO EVERYDAY')}</Eyebrow>
          <h2>
            {t('خطوة بخطوة،', 'Step by step,')}
            <br />
            <em>{t('نقترب من حلمك.', 'closer to your vision.')}</em>
          </h2>
          <div className="drawing-wrap">
            <KitchenDrawing stage={reduced ? 3 : active} />
            <span className="drawing-index" dir="ltr">
              0{active + 1} <span>/ 04</span>
            </span>
          </div>
          <div className="process-progress" aria-hidden="true">
            {steps.map((s, i) => (
              <span key={s.num} className={i <= active ? 'filled' : ''} />
            ))}
          </div>
          <p className="drawing-caption">
            {t('رسم تصوّري لتوضيح مراحل العمل', 'CONCEPTUAL ILLUSTRATION OF THE PROCESS')}
          </p>
        </div>
        <div className="process-steps">
          {steps.map((s, i) => (
            <motion.article
              className={`process-step ${active === i ? 'is-active' : ''}`}
              key={s.num}
              initial={false}
              animate={{ opacity: 1, x: reduced ? 0 : active === i ? 0 : 6 }}
              transition={{ duration: 0.4 }}
            >
              <span className="step-number">{s.num}</span>
              <p className="eyebrow">{pick(s.subtitle)}</p>
              <h3>{pick(s.title)}</h3>
              <p>{pick(s.body)}</p>
              <small>{pick(s.note)}</small>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
