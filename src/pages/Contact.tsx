import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, Copy, Download, ExternalLink, Phone, Mail } from 'lucide-react';
import { business } from '../content/site';
import { useLocale } from '../localization/Locale';
import { Arrow, Eyebrow, PageIntro } from '../components/UI';
export default function Contact() {
  const { t, locale } = useLocale();
  const [params] = useSearchParams();
  const [purpose, setPurpose] = useState('kitchen');
  useEffect(() => {
    const requested = params.get('purpose');
    if (requested && ['project', 'visit', 'catalog'].includes(requested)) setPurpose(requested);
  }, [params]);
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState('');
  const output = useRef<HTMLTextAreaElement>(null);
  function generate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const contactInput = form.elements.namedItem('contact') as HTMLInputElement;
    const contact = String(data.get('contact') || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) && !/^\+?[\d\s()\-]{7,20}$/.test(contact)) {
      contactInput.setCustomValidity(
        t(
          'أدخل رقم جوال أو بريدًا إلكترونيًا صالحًا.',
          'Enter a valid phone number or email address.',
        ),
      );
      contactInput.reportValidity();
      return;
    }
    const purpose = (form.elements.namedItem('purpose') as HTMLSelectElement).selectedOptions[0]
      .text;
    const labels =
      locale === 'ar'
        ? ['طلب جديد — رواد المطابخ', 'الاسم', 'وسيلة التواصل', 'المدينة', 'نوع الطلب', 'التفاصيل']
        : ['New inquiry — ROWAD Kitchens', 'Name', 'Contact', 'City', 'Inquiry type', 'Details'];
    setSummary(
      `${labels[0]}\n\n${labels[1]}: ${data.get('name')}\n${labels[2]}: ${data.get('contact')}\n${labels[3]}: ${data.get('city') || '—'}\n${labels[4]}: ${purpose}\n\n${labels[5]}:\n${data.get('message')}`,
    );
    setStatus('');
    requestAnimationFrame(() => {
      output.current?.focus();
      output.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
        block: 'center',
      });
    });
  }
  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setStatus(
        t(
          'تم نسخ الملخص. لم يُرسل إلى رواد بعد.',
          'Summary copied. It has not been sent to ROWAD.',
        ),
      );
    } catch {
      output.current?.focus();
      output.current?.select();
      setStatus(
        t(
          'يمكنك نسخ النص المحدد يدويًا. لم يتم الإرسال.',
          'Copy the selected text manually. Nothing has been sent.',
        ),
      );
    }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rowad-inquiry.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(
      t(
        'تم تجهيز الملف للتنزيل. لم يُرسل الطلب.',
        'The file is ready to download. Your inquiry has not been sent.',
      ),
    );
  }
  return (
    <>
      <PageIntro
        eyebrow={t('بداية حكاية جديدة', 'THE BEGINNING OF A NEW STORY')}
        title={t('لنبدأ بما تتخيّله.', 'Let’s begin with what you imagine.')}
      >
        <p>
          {t(
            'مطبخ جديد، فكرة مختلفة، أو مشروع قادم. رتّب تفاصيل طلبك في مساحة واحدة.',
            'A new kitchen, a different idea, or an upcoming project. Bring the details of your inquiry together.',
          )}
        </p>
      </PageIntro>
      <section className="container contact-grid">
        <aside className="contact-aside">
          <Eyebrow>{t('خطوتك الأولى', 'YOUR FIRST STEP')}</Eyebrow>
          <h2>{t('كل تفصيل، يساعدنا على فهم فكرتك.', 'Every detail helps tell your story.')}</h2>
          <p>
            {t(
              'هذا النموذج يجهّز ملخصًا يمكنك نسخه أو تنزيله، ثم مشاركته بنفسك عبر قناة رواد المعتمدة. لا يرسل بياناتك ولا يحفظها على خادم.',
              'This form prepares a summary to copy or download and share through a verified ROWAD channel. It does not send your information or store it on a server.',
            )}
          </p>
          <div className="verified-contact">
            {business.phone && (
              <a href={`tel:${business.phone}`}>
                <Phone />
                {business.phone}
              </a>
            )}
            {business.email && (
              <a href={`mailto:${business.email}`}>
                <Mail />
                {business.email}
              </a>
            )}
            <a href={business.originalWebsite} target="_blank" rel="noreferrer">
              <ExternalLink size={18} />
              {t('موقع رواد الأصلي', 'Original ROWAD website')}
            </a>
            {!business.phone && !business.email && (
              <p className="small-note">
                {t(
                  'بيانات التواصل المباشر قيد التحقق. راجع الموقع الأصلي للحصول على القناة المعتمدة.',
                  'Direct contact details await verification. Refer to the original website for an official channel.',
                )}
              </p>
            )}
          </div>
          <div className="contact-monogram" aria-hidden="true">
            R<span> / </span>K
          </div>
        </aside>
        <div className="contact-form-wrap">
          <form onSubmit={generate}>
            <div className="form-heading">
              <span className="index">01 /</span>
              <h2>{t('أخبرنا عن فكرتك', 'Tell us about your idea')}</h2>
            </div>
            <div className="form-row">
              <label>
                {t('الاسم *', 'Name *')}
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder={t('اسمك الكريم', 'Your name')}
                />
              </label>
              <label>
                {t('الجوال أو البريد الإلكتروني *', 'Phone or email *')}
                <input
                  name="contact"
                  autoComplete="email"
                  onInput={(e) => e.currentTarget.setCustomValidity('')}
                  required
                  maxLength={160}
                  placeholder={t('كيف يمكن التواصل معك؟', 'How can you be reached?')}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                {t('المدينة', 'City')}
                <input
                  name="city"
                  autoComplete="address-level2"
                  maxLength={100}
                  placeholder={t('مدينتك', 'Your city')}
                />
              </label>
              <label>
                {t('نوع الطلب', 'Inquiry type')}
                <select name="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
                  <option value="kitchen">{t('تصميم مطبخ', 'Kitchen design')}</option>
                  <option value="project">{t('مشروع أو شراكة', 'Project or partnership')}</option>
                  <option value="visit">{t('زيارة معرض', 'Showroom visit')}</option>
                  <option value="catalog">{t('طلب الكتالوج', 'Catalog request')}</option>
                  <option value="other">{t('استفسار آخر', 'Another inquiry')}</option>
                </select>
              </label>
            </div>
            <label>
              {t('ما الذي تتخيّله؟ *', 'What do you have in mind? *')}
              <textarea
                name="message"
                rows={5}
                required
                minLength={10}
                maxLength={3000}
                placeholder={t(
                  'حدّثنا عن مساحتك، والتصميم الذي تحبه، وأهم احتياجاتك…',
                  'Tell us about your space, the design you like, and what matters to you…',
                )}
              />
              <small>{t('١٠ أحرف على الأقل.', 'At least 10 characters.')}</small>
            </label>
            <div className="form-action">
              <button type="submit" className="button button--dark">
                <span>{t('جهّز ملخص طلبي', 'Prepare my inquiry')}</span>
                <Arrow />
              </button>
              <span className="small-note">
                {t('خطوة تحضيرية، وليست إرسالًا.', 'Preparation only. No message is sent.')}
              </span>
            </div>
          </form>
          {summary && (
            <section className="inquiry-result" aria-labelledby="result-heading">
              <Eyebrow>{t('خطوتك التالية', 'YOUR NEXT STEP')}</Eyebrow>
              <h2 id="result-heading">
                {t('ملخصك جاهز للمراجعة', 'Your summary is ready to review')}
              </h2>
              <p>
                {t(
                  'لم يتم إرسال الطلب. انسخ الملخص وشاركه عبر قناة التواصل المعتمدة بعد التحقق منها.',
                  'Your inquiry has not been sent. Copy this summary and share it through a verified contact channel.',
                )}
              </p>
              <textarea
                ref={output}
                value={summary}
                readOnly
                rows={10}
                aria-label={t('ملخص الطلب', 'Inquiry summary')}
              />
              <div className="summary-actions">
                <button className="button button--dark" onClick={copySummary}>
                  <span>{t('نسخ الملخص', 'Copy summary')}</span>
                  <Copy size={18} />
                </button>
                <button className="button button--outline" onClick={download}>
                  <span>{t('تنزيل نصي', 'Download text')}</span>
                  <Download size={18} />
                </button>
              </div>
              <p className="copy-status" role="status">
                {status && (
                  <>
                    <Check size={17} />
                    {status}
                  </>
                )}
              </p>
            </section>
          )}
        </div>
      </section>
    </>
  );
}
