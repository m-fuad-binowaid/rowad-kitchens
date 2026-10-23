import { useEffect, useRef } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    controls.set({ opacity: 0, y: 28 });
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          void controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
          });
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [controls, reduced, delay]);
  return (
    <motion.div ref={ref} className={className} initial={false} animate={controls}>
      {children}
    </motion.div>
  );
}
