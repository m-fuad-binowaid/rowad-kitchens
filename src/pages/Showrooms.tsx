import { MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { useLocale } from '../localization/Locale';
import { business } from '../content/site';
import { ButtonLink, Eyebrow, PageIntro, ContactBanner } from '../components/UI';
export default function Showrooms() {
  const { t, pick } = useLocale();
  return (
    <>
      <PageIntro
        eyebrow={t('معارض رواد', 'ROWAD SHOWROOMS')}
        title={t('اقترب من التفاصيل.', 'Get closer to the details.')}
      >
        <p>
          {t(
            'الزيارة فرصة لتوضيح فكرتك ومناقشة التصميم. خطّط لها، واجمع ما يلهمك قبل أن تبدأ.',
            'A visit is a chance to share your ideas and discuss the design. Plan ahead and bring what inspires you.',
          )}
        </p>
      </PageIntro>
      <section className="container showroom-section">
        {business.showrooms.length ? (
          business.showrooms.map((s) => (
            <article className="showroom-card" key={s.phone}>
              <MapPin />
              <h2>{pick(s.name)}</h2>
              <p>{pick(s.address)}</p>
              <a href={`tel:${s.phone}`}>
                <Phone />
                {s.phone}
              </a>
              <a href={s.mapUrl} target="_blank" rel="noreferrer">
                {t('الاتجاهات', 'Directions')}
                <ArrowUpRight />
              </a>
            </article>
          ))
        ) : (
          <div className="showroom-layout">
            <div className="architectural-panel" aria-hidden="true">
              <span className="architectural-word">ROWAD</span>
              <div className="arch arch-one" />
              <div className="arch arch-two" />
              <div className="arch arch-three" />
              <div className="arch-line" />
              <span className="architectural-caption">A SPACE TO BEGIN.</span>
            </div>
            <div className="showroom-copy">
              <Eyebrow>{t('خطّط لزيارتك', 'PLAN YOUR VISIT')}</Eyebrow>
              <h2>{t('نلتقي حول فكرتك.', 'A conversation around your idea.')}</h2>
              <p>
                {t(
                  'تفاصيل الفروع والعناوين وأرقام الاتصال قيد التحقق من الموقع الأصلي. يرجى التأكد من بيانات المعرض قبل التوجه إليه.',
                  'Branch details, addresses, and telephone numbers are awaiting verification from the original website. Please confirm the showroom details before travelling.',
                )}
              </p>
              <a
                className="button button--outline"
                href={business.originalWebsite}
                target="_blank"
                rel="noreferrer"
              >
                <span>{t('تحقق عبر موقع رواد الأصلي', 'Check the original ROWAD website')}</span>
                <ArrowUpRight size={19} />
              </a>
              <p className="small-note">
                {t(
                  'لا تتوفر ساعات عمل أو روابط خرائط موثقة في المواد المقدمة.',
                  'Verified opening hours and map links are not available in the supplied material.',
                )}
              </p>
            </div>
          </div>
        )}
        <div className="visit-checklist">
          <div>
            <Eyebrow>{t('زيارة أوضح، بداية أفضل', 'A CLEARER VISIT, A BETTER BEGINNING')}</Eyebrow>
            <h2>{t('أحضر فكرتك معك.', 'Bring your idea along.')}</h2>
          </div>
          <ul>
            <li>
              {t(
                'صور المساحة وأبعادها التقريبية.',
                'Photos and approximate dimensions of the space.',
              )}
            </li>
            <li>
              {t(
                'التصاميم التي أعجبتك من المجموعة.',
                'Your favourite designs from the collection.',
              )}
            </li>
            <li>
              {t('احتياجاتك وأسئلتك حول المطبخ.', 'Your needs and questions about the kitchen.')}
            </li>
          </ul>
          <ButtonLink to="/contact" variant="text">
            {t('رتّب طلبك قبل الزيارة', 'Prepare your inquiry')}
          </ButtonLink>
        </div>
      </section>
      <ContactBanner />
    </>
  );
}
