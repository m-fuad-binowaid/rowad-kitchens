import { useLocale } from '../localization/Locale';
import { ButtonLink, ContactBanner, Eyebrow, PageIntro, Photo } from '../components/UI';
import { Reveal } from '../motion/Reveal';
export default function About() {
  const { t } = useLocale();
  return (
    <>
      <PageIntro
        eyebrow={t('عن رواد المطابخ', 'ABOUT ROWAD')}
        title={t('للمساحة رؤية. وللتفاصيل رواد.', 'A vision for space. An eye for detail.')}
      >
        <p>
          {t(
            'شركة رواد المطابخ للصناعة — شركة سعودية لتصميم وتصنيع المطابخ.',
            'ROWAD Kitchens Manufacturing — a Saudi kitchen design and manufacturing company.',
          )}
        </p>
      </PageIntro>
      <div className="container about-photo">
        <Photo
          id="04"
          alt={t(
            'تفاصيل تصميم مطبخ رواد الكلاسيكي',
            'Classic kitchen design from the ROWAD collection',
          )}
          priority
          sizes="90vw"
        />
        <span className="photo-index">ROWAD / THE ART OF EVERYDAY</span>
      </div>
      <section className="container section about-statement">
        <Reveal>
          <Eyebrow index="01">{t('من الفكرة إلى البيت', 'FROM IDEA TO HOME')}</Eyebrow>
          <h2>
            {t('المطبخ جزء من الحياة،', 'The kitchen is part of life,')}
            <br />
            <em>{t('قبل أن يكون جزءًا من البيت.', 'before it is part of a home.')}</em>
          </h2>
        </Reveal>
        <Reveal>
          <p className="large-body">
            {t(
              'تلتقي في المطبخ بداية اليوم ولقاء العائلة وتفاصيل لا ننتبه لها، لكنها تصنع شعور البيت. من هنا نرى أهمية التصميم الذي يفهم المساحة ويمنح كل تفصيل مكانه.',
              'A kitchen holds the start of the day, a family gathering, and the small moments that make a home. It calls for a design that understands the space and gives each detail its place.',
            )}
          </p>
          <p>
            {t(
              'تجمع رحلة رواد بين القياس وتحديد الاحتياجات، والتصميم الأولي، والتصنيع، والتركيب. خطوات مترابطة تبدأ بفكرتك وتتقدم نحو مساحتك.',
              'The ROWAD journey brings together measurement and requirements, initial design, manufacturing, and installation. Connected stages that begin with your idea and move toward your space.',
            )}
          </p>
          <ButtonLink to="/process" variant="text">
            {t('تعرّف على مراحل العمل', 'Explore the process')}
          </ButtonLink>
        </Reveal>
      </section>
      <section className="values-section section">
        <div className="container">
          <Eyebrow index="02">
            {t('طريقتنا في النظر إلى التصميم', 'HOW WE THINK ABOUT DESIGN')}
          </Eyebrow>
          <div className="values-grid">
            {[
              [
                t('المساحة أولًا', 'Space comes first'),
                t(
                  'توزيع يبدأ بفهم الحركة والاستخدام، قبل اختيار الشكل.',
                  'A layout begins with movement and use, before its appearance.',
                ),
              ],
              [
                t('التفاصيل تتكامل', 'Details belong together'),
                t(
                  'اللون والإضاءة والخطوط أجزاء من صورة واحدة.',
                  'Colour, light, and lines are parts of the same composition.',
                ),
              ],
              [
                t('الذوق شخصي', 'Taste is personal'),
                t(
                  'اختيارات تعكس ما تحب، وتنسجم مع بيتك.',
                  'Choices that reflect what you love and feel at home in your space.',
                ),
              ],
            ].map(([title, body], i) => (
              <Reveal key={title}>
                <span className="value-index">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ContactBanner />
    </>
  );
}
