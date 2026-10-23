import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLocale } from '../localization/Locale';
import { kitchens } from '../content/site';
import type { Kitchen } from '../content/site';
import { Arrow, ButtonLink, ContactBanner, Eyebrow, Photo } from '../components/UI';
import { Lightbox } from '../components/Lightbox';
import NotFound from './NotFound';
export default function ProjectDetail() {
  const { slug } = useParams();
  const { t, pick, localPath } = useLocale();
  const kitchen = kitchens.find((k) => k.detail === `/projects/${slug}`);
  const [selected, setSelected] = useState<Kitchen | null>(null);
  if (!kitchen) return <NotFound />;
  const quiet = kitchen.id === '13';
  const related = kitchens.find((k) => k.large && k.id !== kitchen.id)!;
  return (
    <>
      <header className="container detail-intro">
        <Link className="back-link" to={localPath('/projects')}>
          <Arrow />
          {t('المشاريع والتصاميم', 'Projects & designs')}
        </Link>
        <div className="detail-heading">
          <div>
            <Eyebrow>
              {t('من مجموعة رواد / قراءة تصميمية', 'FROM THE ROWAD COLLECTION / A DESIGN STUDY')}
            </Eyebrow>
            <h1>{pick(kitchen.title)}</h1>
          </div>
          <span className="detail-number">0{quiet ? '1' : '2'}</span>
        </div>
      </header>
      <button
        className="detail-hero image-button"
        onClick={() => setSelected(kitchen)}
        aria-label={t('تكبير صورة التصميم', 'Enlarge design photograph')}
      >
        <Photo id={kitchen.id} alt={pick(kitchen.description)} priority sizes="100vw" />
        <span className="detail-enlarge">{t('عرض الصورة كاملة +', 'VIEW FULL PHOTOGRAPH +')}</span>
      </button>
      <section className="container section detail-story">
        <aside>
          <Eyebrow>{t('الملامح البصرية', 'VISUAL NOTES')}</Eyebrow>
          <dl>
            <dt>{t('الطابع', 'Expression')}</dt>
            <dd>{quiet ? t('معاصر', 'Contemporary') : t('كلاسيكي', 'Classic')}</dd>
            <dt>{t('لوحة الألوان', 'Palette')}</dt>
            <dd>{pick(kitchen.palette)}</dd>
            <dt>{t('المصدر', 'Source')}</dt>
            <dd>{t('صور رواد المرفقة', 'Supplied ROWAD photography')}</dd>
          </dl>
        </aside>
        <div>
          <h2>
            {quiet
              ? t('تباين يمنح التفاصيل حضورها.', 'Contrast gives each detail a presence.')
              : t('ضوء يفتح للمساحة آفاقًا.', 'Light opens up the space.')}
          </h2>
          <p className="large-body">
            {quiet
              ? t(
                  'واجهة رمادية هادئة، وسطح عمل داكن، وخطوط من الضوء الدافئ. تكوين يوازن بين بساطة الخطوط وعمق الألوان، ويمنح كل جزء مساحة ليتنفس.',
                  'Muted grey cabinetry, a dark worktop, and lines of warm light. A composition that balances simple forms with depth of colour, giving each element room to breathe.',
                )
              : t(
                  'واجهات فاتحة بإطارات كلاسيكية، وتفاصيل داكنة تؤكد التباين. تتوسط الجزيرة المشهد، فتجمع بين سطح العمل ومكان للجلوس في تكوين واحد.',
                  'Light framed cabinetry and dark accents establish a classic contrast. The island anchors the composition, bringing a work surface and a place to sit together.',
                )}
          </p>
          <p className="content-note">
            {t(
              'الوصف قراءة لما يظهر في الصورة، ولا يحدد مواد أو أبعادًا أو موقعًا أو عميلًا بعينه.',
              'This description is based on what is visible in the photograph. Materials, dimensions, location, and client are not verified.',
            )}
          </p>
          <ButtonLink to="/contact" variant="outline">
            {t('أستلهم منه مطبخي', 'Use this as inspiration')}
          </ButtonLink>
        </div>
      </section>
      <section className="related-section">
        <div className="container related-inner">
          <Photo
            id={related.id}
            alt={pick(related.description)}
            sizes="(max-width: 600px) 100vw, 40vw"
          />
          <div>
            <Eyebrow>{t('مساحة أخرى، تعبير آخر', 'ANOTHER SPACE, ANOTHER EXPRESSION')}</Eyebrow>
            <h2>{pick(related.title)}</h2>
            <ButtonLink to={related.detail!} variant="text">
              {t('التصميم التالي', 'Next design')}
            </ButtonLink>
          </div>
        </div>
      </section>
      <ContactBanner />
      <Lightbox
        items={kitchens.filter((k) => k.large)}
        selected={selected}
        onSelect={setSelected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
