import type { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  className?: string;
  threshold?: number;
}

/**
 * Renders its children directly. Used to be a scroll-triggered fade/slide-in
 * wrapper; that reveal-on-scroll effect was removed site-wide, but the
 * component is kept (as a no-op) so call sites don't need to change.
 */
const FadeIn: FC<Props> = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};

export default FadeIn;