import { trapDialogFocus } from './dialogFocus';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUp } from 'lucide-react';
import { navigation, business } from '../content/site';
import { useLocale } from '../localization/Locale';
import { Arrow, ButtonLink } from './UI';
export function Layout() {
  const { t, pick, localPath, locale } = useLocale();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const previousPath = useRef(location.pathname);
  const currentPath = location.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  useEffect(() => {
    setOpen(false);
    if (previousPath.current !== location.pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('main-content')?.focus({ preventScroll: true });
      previousPath.current = location.pathname;
    }
  }, [location.pathname]);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.current?.close();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  const closeMenu = () => {
    setOpen(false);
    menuButton.current?.focus();
  };
  return (
    <>
      <a className="skip-link" href="#main-content">
        {t('انتقل إلى المحتوى', 'Skip to content')}
      </a>
      <div className="topline">
        <div className="container">
          <span>{t('شركة رواد المطابخ للصناعة', 'ROWAD KITCHENS MANUFACTURING')}</span>
          <span>{t('تصميم يرافق الحياة', 'DESIGNED AROUND LIFE')}</span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link
            className="brand"
            to={localPath('/')}
            aria-label={t('رواد المطابخ — الرئيسية', 'ROWAD Kitchens — home')}
          >
            <img
              src="/images/rowad-logo.jpg"
              alt={t('رواد المطابخ', 'ROWAD Kitchens')}
              width="489"
              height="408"
            />
          </Link>
          <nav className="desktop-nav" aria-label={t('القائمة الرئيسية', 'Main navigation')}>
            {navigation.slice(1).map((n) => (
              <NavLink key={n.path} to={localPath(n.path)}>
                {pick(n.label)}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              className="language-switch"
              to={locale === 'ar' ? `/en${currentPath === '/' ? '' : currentPath}` : currentPath}
              lang={locale === 'ar' ? 'en' : 'ar'}
              aria-label={locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              {locale === 'ar' ? 'EN' : 'عربي'}
            </Link>
            <ButtonLink className="header-contact" to="/contact" variant="dark">
              {t('لنتحدث', 'Let’s talk')}
            </ButtonLink>
            <button
              className="icon-button menu-toggle"
              ref={menuButton}
              onClick={() => setOpen(true)}
              aria-label={t('فتح القائمة', 'Open menu')}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>
      <dialog
        onKeyDown={trapDialogFocus}
        ref={dialog}
        className="mobile-menu"
        id="mobile-navigation"
        onCancel={closeMenu}
        aria-label={t('القائمة الرئيسية', 'Main navigation')}
      >
        <div className="mobile-menu-top">
          <span className="wordmark">
            ROWAD<span> / </span>
            {t('القائمة', 'MENU')}
          </span>
          <button
            className="icon-button"
            onClick={closeMenu}
            aria-label={t('إغلاق القائمة', 'Close menu')}
            autoFocus
          >
            <X />
          </button>
        </div>
        <nav>
          {navigation.map((n, i) => (
            <NavLink key={n.path} to={localPath(n.path)} onClick={closeMenu} end={n.path === '/'}>
              <span className="index">0{i + 1}</span>
              {pick(n.label)}
              <Arrow diagonal />
            </NavLink>
          ))}
        </nav>
        <div className="menu-bottom">
          <ButtonLink to="/contact">{t('ابدأ رحلتك معنا', 'Start your journey')}</ButtonLink>
          <p>{t('مساحات مدروسة. تفاصيل تعيش معك.', 'Considered spaces. Details to live with.')}</p>
        </div>
      </dialog>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <img
                src="/images/rowad-logo.jpg"
                alt={t('رواد المطابخ', 'ROWAD Kitchens')}
                width="489"
                height="408"
              />
              <p>
                {t('مساحة تشبهك.', 'A space of your own.')}
                <br />
                {t('وتفاصيل تعيش معك.', 'Details to live with.')}
              </p>
            </div>
            <div className="footer-nav">
              <p className="eyebrow">{t('اكتشف رواد', 'EXPLORE ROWAD')}</p>
              {navigation.slice(1, 4).map((n) => (
                <Link key={n.path} to={localPath(n.path)}>
                  {pick(n.label)}
                </Link>
              ))}
            </div>
            <div className="footer-nav">
              <p className="eyebrow">{t('خطوتك القادمة', 'YOUR NEXT STEP')}</p>
              <Link to={localPath('/process')}>{t('كيف نعمل', 'Our process')}</Link>
              <Link to={localPath('/showrooms')}>{t('زيارة معرض', 'Plan a visit')}</Link>
              <Link to={localPath('/catalog')}>{t('دليل التصاميم', 'Design guide')}</Link>
              <Link to={localPath('/contact')}>{t('تواصل معنا', 'Contact')}</Link>
            </div>
            <div className="footer-note">
              <p className="eyebrow">{t('من الفكرة إلى المساحة', 'FROM IDEA TO SPACE')}</p>
              <p>
                {t(
                  'ابدأ بما تتخيّله، ودع التفاصيل تأخذ مكانها.',
                  'Begin with what you imagine. Let the details find their place.',
                )}
              </p>
              <a href={business.originalWebsite} target="_blank" rel="noreferrer">
                {t('زيارة الموقع الأصلي', 'Visit the original website')}
                <Arrow diagonal />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              {t(
                '© رواد المطابخ. نموذج الموقع الجديد.',
                '© ROWAD Kitchens. New website prototype.',
              )}
            </span>
            <span dir="ltr">CRAFTED AROUND YOU.</span>
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'instant'
                    : 'smooth',
                })
              }
            >
              {t('إلى الأعلى', 'Back to top')}
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
