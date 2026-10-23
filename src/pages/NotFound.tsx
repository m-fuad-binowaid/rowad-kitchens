import { useLocale } from '../localization/Locale';
import { ButtonLink, Eyebrow } from '../components/UI';
export default function NotFound() {
  const { t } = useLocale();
  return (
    <section className="container not-found">
      <Eyebrow>404 / ROWAD</Eyebrow>
      <h1>{t('هذه المساحة غير موجودة.', 'This space hasn’t been found.')}</h1>
      <p>{t('لنعد إلى مكان تبدأ فيه الأفكار.', 'Let’s return to where ideas begin.')}</p>
      <ButtonLink to="/">{t('العودة للرئيسية', 'Return home')}</ButtonLink>
    </section>
  );
}
