import { ArrowUpLeft, ArrowUpRight, ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useLocale } from '../localization/Locale';
import type { Kitchen } from '../content/site';
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  const { locale } = useLocale();
  const Icon = diagonal
    ? locale === 'ar'
      ? ArrowUpLeft
      : ArrowUpRight
    : locale === 'ar'
      ? ArrowLeft
      : ArrowRight;
  return <Icon size={20} strokeWidth={1.5} aria-hidden="true" />;
}
export function ButtonLink({
  to,
  children,
  variant = 'primary',
  className = '',
}: {
  to: string;
  children: ReactNode;
  variant?: 'primary' | 'dark' | 'outline' | 'text';
  className?: string;
}) {
  const { localPath } = useLocale();
  return (
    <Link className={`button button--${variant} ${className}`} to={localPath(to)}>
      <span>{children}</span>
      <span className="button-arrow">
        <Arrow />
      </span>
    </Link>
  );
}
export function Eyebrow({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <p className="eyebrow">
      {index && (
        <span className="index" dir="ltr">
          {index} /
        </span>
      )}
      {children}
    </p>
  );
}
export function Photo({
  id,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 700px) 100vw, 65vw',
  ...rest
}: {
  id: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
}) {
  const large = ['04', '13'].includes(id);
  return (
    <img
      className={className}
      src={`/images/kitchen-${id}.webp`}
      srcSet={
        large
          ? `/images/kitchen-${id}-480.webp 480w, /images/kitchen-${id}-960.webp 960w, /images/kitchen-${id}.webp 1920w`
          : undefined
      }
      sizes={large ? sizes : undefined}
      width={large ? 1920 : 300}
      height={large ? 1080 : 169}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      {...rest}
    />
  );
}
export function KitchenCard({
  kitchen,
  onOpen,
  compact = false,
}: {
  kitchen: Kitchen;
  onOpen: (k: Kitchen) => void;
  compact?: boolean;
}) {
  const { t, pick } = useLocale();
  return (
    <article className={`kitchen-card ${compact ? 'compact' : ''}`}>
      <button
        type="button"
        className="image-button"
        onClick={() => onOpen(kitchen)}
        aria-label={t('عرض الصورة: ', 'View photograph: ') + pick(kitchen.title)}
      >
        <Photo
          id={kitchen.image}
          alt={pick(kitchen.description)}
          sizes={compact ? '300px' : '(max-width: 700px) 100vw, 48vw'}
        />
        <span className="image-open">
          <Plus size={21} />
        </span>
      </button>
      <div className="card-caption">
        <div>
          <p className="small-label">
            {kitchen.category === 'classic'
              ? t('طابع كلاسيكي', 'CLASSIC EXPRESSION')
              : t('طابع معاصر', 'CONTEMPORARY EXPRESSION')}
          </p>
          <h3>{pick(kitchen.title)}</h3>
        </div>
        <span className="palette" role="img" aria-label={pick(kitchen.palette)}>
          {kitchen.colors.map((c) => (
            <i key={c} style={{ background: c }} />
          ))}
        </span>
      </div>
    </article>
  );
}
export function PageIntro({
  eyebrow,
  title,
  children,
  index = '01',
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  index?: string;
}) {
  return (
    <header className="page-intro container">
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <div className="intro-row">
        <h1>{title}</h1>
        {children && <div className="intro-description">{children}</div>}
      </div>
    </header>
  );
}
export function ContactBanner() {
  const { t } = useLocale();
  return (
    <section className="contact-banner">
      <div className="container contact-banner-inner">
        <div>
          <Eyebrow>{t('كل فكرة تستحق أن تبدأ', 'EVERY IDEA DESERVES A BEGINNING')}</Eyebrow>
          <h2>{t('لنتخيّل مطبخك، معًا.', 'Let’s imagine your kitchen.')}</h2>
        </div>
        <ButtonLink to="/contact" variant="dark">
          {t('ابدأ رحلتك معنا', 'Start your journey')}
        </ButtonLink>
      </div>
    </section>
  );
}
