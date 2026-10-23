import { trapDialogFocus } from './dialogFocus';
import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Kitchen } from '../content/site';
import { useLocale } from '../localization/Locale';
import { ButtonLink, Photo } from './UI';
export function Lightbox({
  items,
  selected,
  onSelect,
  onClose,
}: {
  items: Kitchen[];
  selected: Kitchen | null;
  onSelect: (k: Kitchen) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const { t, pick } = useLocale();
  const index = items.findIndex((k) => k.id === selected?.id);
  const move = (offset: number) => onSelect(items[(index + offset + items.length) % items.length]);
  useEffect(() => {
    const d = ref.current;
    if (selected && !d?.open) {
      d?.showModal();
      document.body.style.overflow = 'hidden';
    }
    if (!selected && d?.open) {
      d.close();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);
  useEffect(() => {
    if (!selected) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  });
  return (
    <dialog
      onKeyDown={trapDialogFocus}
      className="lightbox"
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-label={t('عارض صور المطابخ', 'Kitchen image viewer')}
    >
      {selected && (
        <div className="lightbox-content">
          <div className="lightbox-bar">
            <span dir="ltr">
              {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button
              className="icon-button"
              onClick={onClose}
              aria-label={t('إغلاق', 'Close')}
              autoFocus
            >
              <X />
            </button>
          </div>
          <Photo id={selected.image} alt={pick(selected.description)} priority sizes="90vw" />
          <div className="lightbox-bottom">
            <div>
              <h2>{pick(selected.title)}</h2>
              <p>{pick(selected.description)}</p>
              {!selected.large && (
                <small>
                  {t(
                    'الصورة الأصلية متاحة بدقة مصغّرة.',
                    'Original photograph supplied at thumbnail resolution.',
                  )}
                </small>
              )}
            </div>
            <div className="viewer-controls">
              <button
                className="icon-button"
                onClick={() => move(-1)}
                aria-label={t('الصورة السابقة', 'Previous image')}
              >
                <ChevronLeft />
              </button>
              <button
                className="icon-button"
                onClick={() => move(1)}
                aria-label={t('الصورة التالية', 'Next image')}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          {selected.detail && (
            <div onClick={onClose}>
              <ButtonLink to={selected.detail} variant="text">
                {t('اكتشف تفاصيل التصميم', 'Explore this design')}
              </ButtonLink>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
