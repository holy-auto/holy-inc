import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import FadeIn from '@/components/base/FadeIn';
import CraftCanvas from '@/components/base/CraftCanvas';

const TeamSection: FC = () => {
  const { t } = useTranslation('common');
  const team = t('about.team', { returnObjects: true }) as Record<string, unknown>;
  const stats = team.stats as Array<{ value: string; label: string }>;
  const pillars = team.pillars as Array<{ title: string; description: string }>;

  return (
    <section className="w-full py-16 md:py-24">
      <div className="px-6 md:px-10 max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
            {team.label as string}
          </p>
          <h2 className="text-slate-800 text-2xl md:text-3xl font-bold tracking-wide mb-4">
            {team.heading as string}
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-3xl mb-10">
            {team.subtitle as string}
          </p>
          <div className="w-12 h-px bg-teal-400 mb-10" />
        </FadeIn>

        {/* Leadership */}
        <FadeIn delay={100}>
          <div className="mb-10">
            <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
              {(team.leadershipLabel as string) || 'Leadership'}
            </p>
            <h3 className="text-slate-800 text-xl md:text-2xl font-bold tracking-wide mb-6">
              {(team.leadershipHeading as string) || 'Leadership Team'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(team.members as Array<{ name: string; role: string; bio: string; initials?: string }>)?.map((member, index) => (
                <div key={member.name} className="bg-white rounded-lg p-5 flex items-start gap-4">
                  {index === 0 ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <CraftCanvas variant="thread" kanji="人" rounded={false} className="absolute inset-0 h-full w-full" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                      {member.initials || 'H'}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="text-slate-900 font-bold text-sm">{member.name}</h4>
                    <p className="text-teal-600 text-xs font-medium mb-1.5">{member.role}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Stats row */}
        <FadeIn delay={150}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg p-5 text-center">
                <p className="text-teal-600 text-2xl md:text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-slate-500 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Culture pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((pillar, index) => (
            <FadeIn key={pillar.title} delay={200 + 100 * index}>
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-slate-800 font-bold text-sm mb-2">{pillar.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{pillar.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;