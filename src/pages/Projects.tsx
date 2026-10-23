import { useLocale } from '../localization/Locale';
import { kitchens } from '../content/site';
import { ButtonLink, ContactBanner, Eyebrow, PageIntro, Photo } from '../components/UI';
import { Reveal } from '../motion/Reveal';
export default function Projects() {
  const { t, pick } = useLocale();
  return (
    <>
      <PageIntro
        eyebrow={t('المشاريع والشراكات', 'PROJECTS & PARTNERSHIPS')}
        title={t('أفكار تستحق مساحة.', 'Ideas deserve a space.')}
      >
        <p>
          {t(
            'قراءات بصرية في مجموعة رواد، وبداية حديث عن مشروعك القادم.',
            'Visual studies from the ROWAD collection, and a place to begin your next project conversation.',
          )}
        </p>
      </PageIntro>
      <section className="container projects-list">
        {kitchens.slice(0, 2).map((k, i) => (
          <Reveal key={k.id} className="project-feature">
            <div className="project-feature-image">
              <Photo id={k.image} alt={pick(k.description)} priority={i === 0} />
            </div>
            <div className="project-feature-copy">
              <Eyebrow index={`0${i + 1}`}>{t('قراءة تصميمية', 'A DESIGN STUDY')}</Eyebrow>
              <h2>{pick(k.title)}</h2>
              <p>{pick(k.description)}</p>
              <ButtonLink to={k.detail!} variant="text">
                {t('اكتشف التصميم', 'Explore the design')}
              </ButtonLink>
            </div>
          </Reveal>
        ))}
        <p className="content-note">
          {t(
            'هذه دراسات بصرية من الصور المقدمة. لا تتوفر حاليًا معلومات موثقة عن أسماء العملاء أو مواقع المشاريع أو الشراكات؛ لذلك لا تُنسب الصور إلى مشروع محدد.',
            'These are visual studies of the supplied photographs. Verified client names, project locations, and partnerships are not currently available, so photographs are not attributed to specific commissions.',
          )}
        </p>
      </section>
      <section className="partnership-section section">
        <div className="container partnership-grid">
          <Eyebrow>{t('مساحة للشراكة', 'ROOM FOR COLLABORATION')}</Eyebrow>
          <div>
            <h2>{t('هل تعمل على مشروع؟', 'Have a project in mind?')}</h2>
            <p>
              {t(
                'جهّز نطاق المشروع، وعدد المساحات، وما تتطلع إليه. نقطة بداية واضحة تساعد على مناقشة المتطلبات والخطوة التالية.',
                'Bring together your project scope, the number of spaces, and what you hope to achieve. A clear starting point helps frame the requirements and next steps.',
              )}
            </p>
            <ButtonLink to="/contact?purpose=project" variant="dark">
              {t('جهّز استفسار مشروع', 'Prepare a project inquiry')}
            </ButtonLink>
          </div>
        </div>
      </section>
      <ContactBanner />
    </>
  );
}
