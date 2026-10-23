import { useState } from 'react';
import { useLocale } from '../localization/Locale';
import { kitchens } from '../content/site';
import type { Kitchen } from '../content/site';
import { ContactBanner, KitchenCard, PageIntro } from '../components/UI';
import { Lightbox } from '../components/Lightbox';
import { Reveal } from '../motion/Reveal';
export default function Kitchens() {
  const { t } = useLocale();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Kitchen | null>(null);
  const items = kitchens.filter((k) => filter === 'all' || k.category === filter);
  return (
    <>
      <PageIntro
        eyebrow={t('مجموعة رواد', 'THE ROWAD COLLECTION')}
        title={t('مساحات، لها شخصيتها.', 'Spaces with character.')}
      >
        <p>
          {t(
            'خطوط معاصرة، وتفاصيل كلاسيكية. تصفّح مجموعة صور رواد وابحث عمّا يعبّر عنك.',
            'Contemporary lines. Classic details. Explore the ROWAD photographs and find what speaks to you.',
          )}
        </p>
      </PageIntro>
      <section className="container gallery-section">
        <div className="gallery-toolbar">
          <div
            className="filters"
            role="group"
            aria-label={t('تصفية حسب الطابع', 'Filter by style')}
          >
            {[
              ['all', t('الكل', 'All designs')],
              ['modern', t('معاصر', 'Contemporary')],
              ['classic', t('كلاسيكي', 'Classic')],
            ].map(([key, label]) => (
              <button key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>
                {label}
                <span>
                  {key === 'all'
                    ? kitchens.length
                    : kitchens.filter((k) => k.category === key).length}
                </span>
              </button>
            ))}
          </div>
          <span className="result-count" role="status">
            {items.length} {t('تصميمًا', 'designs')}
          </span>
        </div>
        <div className="gallery-grid">
          {items.map((k, i) => (
            <Reveal
              key={k.id}
              className={k.large ? 'gallery-large' : 'gallery-small'}
              delay={(i % 3) * 0.05}
            >
              <KitchenCard kitchen={k} onOpen={setSelected} compact={!k.large} />
            </Reveal>
          ))}
        </div>
        <p className="content-note">
          {t(
            'الأسماء والتصنيفات وصف بصري للصور المرفقة، ولا تشير إلى أسماء مشاريع أو مواصفات مواد معتمدة.',
            'Titles and categories describe the supplied photographs; they are not verified project names or material specifications.',
          )}
        </p>
      </section>
      <ContactBanner />
      <Lightbox
        items={items}
        selected={selected}
        onSelect={setSelected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
