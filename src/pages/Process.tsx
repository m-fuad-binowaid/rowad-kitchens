import { useLocale } from '../localization/Locale';
import { ContactBanner, PageIntro } from '../components/UI';
import { ProcessStory } from '../motion/ProcessStory';
export default function Process() {
  const { t } = useLocale();
  return (
    <>
      <PageIntro
        eyebrow={t('كيف نعمل', 'THE ROWAD PROCESS')}
        title={t('من أول فكرة، إلى آخر تفصيل.', 'From the first idea to the final detail.')}
      >
        <p>
          {t(
            'أربع مراحل مترابطة. رحلة تبدأ بفهم احتياجاتك، وتنتهي باجتماع التفاصيل في مكانها.',
            'Four connected stages. A journey from understanding your needs to bringing the details together in their space.',
          )}
        </p>
      </PageIntro>
      <ProcessStory />
      <section className="container process-preparation section">
        <div>
          <h2>{t('قبل أن نبدأ.', 'Before we begin.')}</h2>
          <p>
            {t(
              'ثلاثة أشياء تساعدك على ترتيب فكرتك.',
              'Three things to help bring your ideas together.',
            )}
          </p>
        </div>
        <ol>
          {[
            t(
              'صور أو مخطط أولي لمساحتك إن توفر.',
              'Photographs or an initial plan of your space, if available.',
            ),
            t('أمثلة لتصاميم وألوان تفضّلها.', 'Examples of designs and colours you like.'),
            t('أولوياتك في الاستخدام والتخزين.', 'Your priorities for everyday use and storage.'),
          ].map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ol>
      </section>
      <ContactBanner />
    </>
  );
}
