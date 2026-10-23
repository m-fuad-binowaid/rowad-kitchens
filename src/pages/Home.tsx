import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLocale } from '../localization/Locale';
import { kitchens } from '../content/site';
import type { Kitchen } from '../content/site';
import { Arrow, ButtonLink, ContactBanner, Eyebrow, KitchenCard, Photo } from '../components/UI';
import { Lightbox } from '../components/Lightbox';
import { Reveal } from '../motion/Reveal';
import { ProcessStory } from '../motion/ProcessStory';
function ExpandingImage() {
  const { t } = useLocale();
  const target = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'center center'] });
  const inset = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const clip = useTransform(inset, (v) => `inset(0 ${v}% 0 ${v}%)`);
  return (
    <section className="cinematic" ref={target}>
      <div className="container cinematic-heading">
        <Eyebrow index="03">{t('حين تأخذ الفكرة مكانها', 'WHEN AN IDEA FINDS ITS SPACE')}</Eyebrow>
        <h2>{t('التفاصيل تصنع الفرق.', 'The difference is in the details.')}</h2>
        <p>
          {t(
            'من الخطوط الأولى إلى لحظاتك اليومية.',
            'From the first lines to your everyday moments.',
          )}
        </p>
      </div>
      <motion.div className="cinematic-image" style={{ clipPath: reduced ? 'none' : clip }}>
        <Photo
          id="04"
          alt={t(
            'مطبخ رواد بواجهات عاجية كلاسيكية وجزيرة وسطية',
            'ROWAD kitchen with classic ivory cabinetry and a central island',
          )}
          sizes="100vw"
        />
      </motion.div>
      <div className="container cinematic-caption">
        <span>
          {t('تصميم متكامل. حضور لا يتكلّف.', 'A considered composition. An effortless presence.')}
        </span>
        <span className="index" dir="ltr">
          ROWAD / SELECTED SPACES
        </span>
      </div>
    </section>
  );
}
export default function Home() {
  const { t, localPath, pick } = useLocale();
  const [selected, setSelected] = useState<Kitchen | null>(null);
  const hero = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 32]);
  return (
    <>
      <section className="home-hero" ref={hero}>
        <div className="hero-copy">
          <Eyebrow>
            {t('رواد المطابخ — مساحة تشبهك', 'ROWAD KITCHENS — A SPACE OF YOUR OWN')}
          </Eyebrow>
          <h1>
            {t('حياةٌ أجمل،', 'Beautiful living,')}
            <br />
            {t('تبدأ من ', 'begins in ')}
            <br />
            <em>{t('المطبخ.', 'the kitchen.')}</em>
          </h1>
          <p>
            {t(
              'لأن المطبخ أكثر من مساحة. هو تفاصيل يومك، ودفء بيتك، وحكاية تبدأ بك.',
              'More than a room. The rhythm of your day, the warmth of your home. A story that begins with you.',
            )}
          </p>
          <ButtonLink to="/kitchens" variant="dark">
            {t('اكتشف مطابخنا', 'Explore our kitchens')}
          </ButtonLink>
          <div className="hero-footnote">
            <span className="vertical-line" />
            {t('تصميم. تصنيع. تفاصيل تُعاش.', 'DESIGN. CRAFT. LIFE IN THE DETAILS.')}
          </div>
        </div>
        <div className="hero-photo">
          <motion.div className="hero-parallax" style={{ y: reduced ? 0 : y }}>
            <Photo
              id="13"
              alt={t(
                'مطبخ رواد رمادي بخطوط معاصرة وإضاءة دافئة',
                'A contemporary grey ROWAD kitchen with warm integrated lighting',
              )}
              priority
              sizes="(max-width: 760px) 100vw, 64vw"
            />
          </motion.div>
          <div className="hero-photo-caption">
            <span>
              <span className="index">01 /</span> {t('هدوء التباين', 'QUIET CONTRAST')}
            </span>
            <Link
              to={localPath('/projects/quiet-contrast')}
              aria-label={t('استكشف هدوء التباين', 'Explore Quiet contrast')}
            >
              <Arrow diagonal />
            </Link>
          </div>
          <span className="hero-image-tag">SELECTED DESIGN — 01</span>
        </div>
      </section>
      <section className="brand-statement container section">
        <Reveal>
          <div className="statement-label">
            <Eyebrow index="01">{t('البيت يبدأ من هنا', 'THIS IS WHERE HOME BEGINS')}</Eyebrow>
            <span className="wordmark small-wordmark">
              R<span> / </span>K
            </span>
          </div>
          <div className="statement-content">
            <h2>
              {t('نصمّم للمساحة.', 'Designed for your space.')}
              <br />
              <span>{t('ونفكّر بمن يعيشها.', 'Considered for your life.')}</span>
            </h2>
            <div>
              <p>
                {t(
                  'في رواد المطابخ، نجمع التصميم والتصنيع في رحلة واحدة. نبدأ بفهم المساحة واحتياجاتك، لنصل إلى مطبخ ينسجم مع بيتك وتفاصيل حياتك.',
                  'At ROWAD Kitchens, design and manufacturing come together in one journey. It begins with your space and needs, toward a kitchen that belongs in your home and everyday life.',
                )}
              </p>
              <ButtonLink to="/about" variant="text">
                {t('تعرّف على رواد', 'The ROWAD approach')}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="collection-section section">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <Eyebrow index="02">
                {t('تعبيرات مختلفة. هوية واحدة.', 'DIFFERENT EXPRESSIONS. ONE APPROACH.')}
              </Eyebrow>
              <h2>{t('أيّ مطبخ يشبهك؟', 'What feels like you?')}</h2>
            </div>
            <ButtonLink to="/kitchens" variant="text">
              {t('كل التصاميم', 'View the collection')}
            </ButtonLink>
          </Reveal>
          <div className="featured-grid">
            {kitchens
              .slice(0, 2)
              .reverse()
              .map((k, i) => (
                <Reveal key={k.id} delay={i * 0.12}>
                  <KitchenCard kitchen={k} onOpen={setSelected} />
                  <p className="featured-note">{pick(k.description)}</p>
                </Reveal>
              ))}
          </div>
          <div className="collection-bottom">
            <p>
              {t(
                'من الطابع الكلاسيكي إلى الخطوط المعاصرة، ابحث عن مساحتك بين التفاصيل.',
                'From classic character to contemporary lines, find your space in the details.',
              )}
            </p>
            <span className="index" dir="ltr">
              01 — 12 / THE COLLECTION
            </span>
          </div>
        </div>
      </section>
      <ExpandingImage />
      <div className="home-process-heading container">
        <Eyebrow index="04">{t('رحلة مطبخك مع رواد', 'YOUR KITCHEN, IN THE MAKING')}</Eyebrow>
        <ButtonLink to="/process" variant="text">
          {t('اكتشف كيف نعمل', 'Discover our process')}
        </ButtonLink>
      </div>
      <ProcessStory compact />
      <section className="materials-section section">
        <div className="container materials-grid">
          <Reveal className="materials-text">
            <Eyebrow index="05">{t('لغة التفاصيل', 'THE LANGUAGE OF DETAILS')}</Eyebrow>
            <h2>
              {t('تناغم تراه.', 'Harmony you can see.')}
              <br />
              <em>{t('ودفء تشعر به.', 'Warmth you can feel.')}</em>
            </h2>
            <p>
              {t(
                'لون يهدّئ المساحة. إضاءة تمنحها عمقًا. وتفاصيل تربط المشهد كله. استلهم من لوحات رواد البصرية، وناقش خيارات المواد والتشطيبات عند التواصل.',
                'A calming tone. Light that adds depth. Details that bring the whole composition together. Explore the visual palettes and discuss available materials and finishes when you get in touch.',
              )}
            </p>
            <ButtonLink to="/kitchens" variant="text">
              {t('استلهم من المجموعة', 'Find your inspiration')}
            </ButtonLink>
          </Reveal>
          <Reveal className="material-composition">
            <div className="swatch swatch-charcoal">
              <span>01</span>
              <p>{t('عمق الفحمي', 'CHARCOAL DEPTH')}</p>
            </div>
            <div className="swatch swatch-stone">
              <span>02</span>
              <p>{t('هدوء الحجر', 'SOFT STONE')}</p>
            </div>
            <div className="swatch swatch-orange">
              <span>03</span>
              <p>{t('دفء رواد', 'ROWAD WARMTH')}</p>
            </div>
            <p className="swatch-note">
              {t(
                'لوحة ألوان مستلهمة من الصور — ليست قائمة مواد متاحة.',
                'A palette inspired by the photographs, not a list of available materials.',
              )}
            </p>
          </Reveal>
        </div>
      </section>
      <section className="visit-section container section">
        <Reveal className="visit-inner">
          <div className="visit-number">
            06<span> /</span>
          </div>
          <div>
            <Eyebrow>{t('من الشاشة إلى المساحة', 'FROM THE SCREEN TO THE SPACE')}</Eyebrow>
            <h2>{t('خذ خطوتك الأولى.', 'Take the first step.')}</h2>
            <p>
              {t(
                'استعد لزيارة المعرض، أو رتّب أفكارك في طلب تصميم واضح.',
                'Prepare for a showroom visit, or bring your ideas together in a design inquiry.',
              )}
            </p>
          </div>
          <ButtonLink to="/showrooms" variant="outline">
            {t('خطّط لزيارتك', 'Plan your visit')}
          </ButtonLink>
        </Reveal>
      </section>
      <ContactBanner />
      <Lightbox
        items={kitchens.slice(0, 2).reverse()}
        selected={selected}
        onSelect={setSelected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
