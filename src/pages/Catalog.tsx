import { useLocale } from '../localization/Locale';
import { business } from '../content/site';
import { ButtonLink, ContactBanner, Eyebrow, PageIntro, Photo } from '../components/UI';
export default function Catalog() {
  const { t } = useLocale();
  return (
    <>
      <PageIntro
        eyebrow={t('دليل التصاميم', 'THE DESIGN GUIDE')}
        title={t('إلهامك، بين التفاصيل.', 'Your inspiration is in the details.')}
      >
        <p>
          {t(
            'اجمع الأفكار التي تناسب مساحتك، وابدأ بتحديد ما تحب.',
            'Collect ideas that suit your space. Begin with what you love.',
          )}
        </p>
      </PageIntro>
      <section className="container catalog-section">
        <div className="catalog-art">
          <div className="catalog-word">
            ROWAD
            <br />
            <em>Spaces.</em>
          </div>
          <Photo
            id="04"
            alt={t('تصميم كلاسيكي من مجموعة رواد', 'A classic design from the ROWAD collection')}
            priority
          />
          <span>{t('اختيارات من مجموعة الصور', 'A SELECTION FROM THE IMAGE COLLECTION')}</span>
        </div>
        <div className="catalog-copy">
          <Eyebrow>{t('الكتالوج الرسمي', 'THE OFFICIAL CATALOG')}</Eyebrow>
          <h2>{t('ابدأ من المجموعة.', 'Begin with the collection.')}</h2>
          {business.catalogUrl ? (
            <a
              className="button button--dark"
              href={business.catalogUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t('عرض الكتالوج الرسمي', 'Open the official catalog')}
            </a>
          ) : (
            <>
              <p>
                {t(
                  'رابط الكتالوج الرسمي غير متاح في المواد المقدمة ولم نتمكن من التحقق منه. يمكنك الآن استعراض الصور المرفقة، أو تجهيز استفسار لطلب الكتالوج من رواد.',
                  'An official catalog link was not supplied and could not be verified. You can explore the supplied photographs or prepare a catalog inquiry for ROWAD.',
                )}
              </p>
              <ButtonLink to="/kitchens" variant="dark">
                {t('استعرض المطابخ', 'Browse the kitchens')}
              </ButtonLink>
              <ButtonLink to="/contact?purpose=catalog" variant="text">
                {t('جهّز طلب الكتالوج', 'Prepare a catalog request')}
              </ButtonLink>
            </>
          )}
        </div>
      </section>
      <ContactBanner />
    </>
  );
}
