import { useState, useRef, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface FAQ {
  question: string;
  answer: string;
}

const AnimatedIcon: FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const verticalRef = useRef<SVGLineElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const vertical = verticalRef.current;
    const circle = circleRef.current;
    if (!vertical || !circle) return;

    if (isOpen) {
      // Animate to minus: vertical line shrinks to 0, circle expands
      vertical.style.transition = 'stroke-dashoffset 0.3s ease-out';
      vertical.style.strokeDashoffset = '20';
      circle.style.transition = 'r 0.3s ease-out';
      circle.setAttribute('r', '14');
    } else {
      // Animate back to plus: vertical line grows, circle shrinks
      vertical.style.transition = 'stroke-dashoffset 0.3s ease-out';
      vertical.style.strokeDashoffset = '0';
      circle.style.transition = 'r 0.3s ease-out';
      circle.setAttribute('r', '0');
    }
  }, [isOpen]);

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="flex-shrink-0"
    >
      {/* Background circle that expands on open */}
      <circle
        ref={circleRef}
        cx="12"
        cy="12"
        r="0"
        fill="currentColor"
        className="text-teal-100"
      />
      {/* Horizontal line — always visible */}
      <line
        x1="5"
        y1="12"
        x2="19"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-teal-600"
      />
      {/* Vertical line — shrinks when open */}
      <line
        ref={verticalRef}
        x1="12"
        y1="5"
        x2="12"
        y2="19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="14"
        strokeDashoffset="0"
        className="text-teal-600"
      />
    </svg>
  );
};

const FAQAccordion: FC = () => {
  const { t } = useTranslation('common');
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs = t('contact.faqData', { returnObjects: true }) as FAQ[];

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const id = String(index);
        const isOpen = openId === id;
        return (
          <div
            key={id}
            className={`bg-white rounded-lg border overflow-hidden transition-colors duration-200 ${
              isOpen ? 'border-teal-300' : 'border-slate-100'
            }`}
          >
            <button
              onClick={() => toggle(id)}
              className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 ${
                isOpen ? 'bg-teal-50/50' : 'hover:bg-slate-50'
              }`}
            >
              <span className="text-sm font-medium text-slate-800 flex-1">
                {faq.question}
              </span>
              <span className="w-6 h-6 flex items-center justify-center">
                <AnimatedIcon isOpen={isOpen} />
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                isOpen ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="relative px-5 pb-4">
                {/* Animated left border line */}
                <div
                  className={`absolute left-5 top-0 bottom-4 w-px bg-teal-300 transition-all duration-300 ease-out origin-top ${
                    isOpen ? 'scale-y-100' : 'scale-y-0'
                  }`}
                />
                <p className="pl-4 text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;