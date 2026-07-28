import React from 'react';
import { LayersIcon, CodeIcon, GamepadIcon, UsersIcon, PhoneIcon } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const STATS = [
{ icon: LayersIcon, value: '4+', label: 'Full-Stack Projects' },
{ icon: CodeIcon, value: '15+', label: 'Technologies' },
{ icon: GamepadIcon, value: '3+', label: 'Game Prototypes' },
{ icon: UsersIcon, value: '2', label: 'Team Leadership Roles' }];


export function About() {
  return (
    <section id="about" className="w-full border-b border-line bg-white px-6">
      <div className="mx-auto w-full max-w-[896px] pb-24 md:pb-28">
        <SectionHeading number="01." title="About Me" />

        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-body">
              Motivated web developer with hands-on experience building full-stack web applications,
              interactive UIs, and game prototypes.
            </p>
            <p className="text-lg leading-relaxed text-body">
              Currently pursuing a Bachelor of Computer Science at Herald College Kathmandu.
              Passionate about creating clean, user-friendly digital products and always learning new
              technologies.
            </p>
            <p className="text-lg leading-relaxed text-body">
              Looking for a role where I can grow, contribute, and deliver real value.
            </p>
            <div className="flex items-center gap-3 pt-4">
              <span className="rounded-xl bg-secondary p-3 text-heading">
                <PhoneIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <a href="tel:+9779826160838" className="text-lg font-medium text-heading">
                +977 9826160838
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map(({ icon: Icon, value, label }) =>
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white p-6 text-center shadow-sm">
              
                <span className="rounded-xl bg-black p-2 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-3xl font-extrabold text-heading">{value}</span>
                <span className="text-sm text-body">{label}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}