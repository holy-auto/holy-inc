import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import FadeIn from '@/components/base/FadeIn';

const ConsultationFlow: FC = () => {
  const { t } = useTranslation('common');
  const flow = t('contact.consultationFlow', { returnObjects: true }) as Record<string, unknown>;
  const steps = flow.steps as Array<{
    step: string;
    title: string;
    description: string;
    icon: string;
  }>;

  return (
    <section className="w-full py-16 md:py-20 bg-slate-50">
      <div className="px-6 md:px-10 max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
            {flow.label as string}
          </p>
          <h2 className="text-slate-800 text-2xl md:text-3xl font-bold tracking-wide mb-4">
            {flow.heading as string}
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-3xl mb-10">
            {flow.subtitle as string}
          </p>
          <div className="w-12 h-px bg-teal-400 mb-10" />
        </FadeIn>

        <div className="relative">
          {/* Horizontal connecting line for desktop */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-slate-200" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {steps.map((step, index) => (
              <FadeIn key={step.step} delay={100 * (index + 1)}>
                <div className="text-center relative">
                  {/* Step number circle */}
                  <div className="w-16 h-16 mx-auto rounded-full bg-teal-50 border-2 border-teal-400 flex items-center justify-center mb-4 relative z-10">
                    <i className={`${step.icon} text-teal-500 text-xl`} />
                  </div>
                  <p className="text-teal-600 text-[10px] font-bold tracking-wider uppercase mb-1">
                    STEP {step.step}
                  </p>
                  <h3 className="text-slate-800 font-bold text-sm mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationFlow;