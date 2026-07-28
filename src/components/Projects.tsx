import React from 'react';
import { ExternalLinkIcon, GithubIcon, LockIcon } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

type Project = {
  eyebrow?: string;
  title: string;
  description: string;
  tech: string[];
  link?: {label: string;href: string;icon: 'external' | 'github';};
  note?: string;
  visual: React.ReactNode;
};

function DieraVisual() {
  return (
    <div className="project-panel relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#FBE9F0]">
      <img
        src="/diera_logo.png"
        alt="Diera.Shop Logo"
        className="h-32 w-auto object-contain"
      />
      <span className="mt-4 text-sm font-medium text-[#B4718B]">Diera Shop</span>
    </div>
  );
}

function LifeFlowVisual() {
  return (
    <div className="project-panel relative flex h-full w-full flex-col items-center justify-center bg-[#FBEDEC]">
      <img
        src="/lifeflow.png"
        alt="LifeFlow Logo"
        className="h-32 w-auto object-contain"
      />
      <span className="mt-4 text-sm font-medium text-[#B4718B]">LifeFlow</span>
    </div>
  );
}

function AirWaysVisual() {
  return (
    <div className="project-panel flex h-full w-full items-center justify-center gap-4 bg-[#E8F1FA]">
      <div className="h-12 w-12 rounded-lg bg-[#D5DEE8]" />
      <div className="h-12 w-12 rounded-lg bg-[#A8DAD5]" />
      <div className="h-12 w-12 rounded-lg bg-[#D5DEE8]" />
    </div>);

}

function GameVisual() {
  return (
    <div className="project-panel flex h-full w-full items-center justify-center bg-[#E4F4EB]">
      <div className="flex h-[72px] w-20 flex-wrap content-start gap-2 rounded-lg bg-[#CDE9DA] p-2.5">
        <div className="h-4 w-full rounded bg-[#9FD3BB]" />
        <div className="h-5 w-6 rounded bg-[#9FD3BB]" />
        <div className="h-5 w-6 rounded bg-[#9FD3BB]" />
      </div>
    </div>);

}

const PROJECTS: Project[] = [
{
  eyebrow: 'Featured Project',
  title: 'Diera Shop',
  description:
  'A full-featured fashion e-commerce platform with curated clothing collections — Bags, Caps, Hoodies, Shoes, Slippers, T-shirts, and Trousers. Features product browsing, category filtering, a shopping cart, and a clean storefront experience.',
  tech: ['React', 'Node.js', 'MongoDB', 'Express'],
  link: { label: 'Live Demo', href: "https://dierashop.com/", icon: 'external' },
  visual: <DieraVisual />
},
{
  eyebrow: 'Featured Project',
  title: 'LifeFlow',
  description:
  'Full-stack blood donation platform connecting donors, recipients, and hospitals directly. Streamlines the process of finding matching blood types in emergencies.',
  tech: ['MongoDB', 'Express', 'React', 'Node.js'],
  link: { label: 'Live Demo', href: "https://lifeflow-uj6d.onrender.com/", icon: 'external' },
  visual: <LifeFlowVisual />
},
{
  title: 'AirWays',
  description:
  'Real-time collaboration platform built with a dedicated team. Served as Project Manager and Full Stack Developer to deliver a seamless user experience.',
  tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
  link: { label: 'GitHub', href: 'https://github.com/Susshxx/colab', icon: 'github' },
  visual: <AirWaysVisual />
},
{
  title: 'Game Dev Projects',
  description:
  'Various 2D/3D game prototypes developing mechanics, physics, and complex UI systems from scratch. Focused on gameplay feel and optimized performance.',
  tech: ['Unity', 'C#'],
  note: 'Personal Projects',
  visual: <GameVisual />
}];


function ProjectRow({ project, reversed }: {project: Project;reversed: boolean;}) {
  return (
    <article className="grid items-center gap-10 md:grid-cols-2 md:gap-6">
      <div className={reversed ? 'md:order-2' : 'md:order-1'}>
        <div className="h-[240px] overflow-hidden rounded-2xl">{project.visual}</div>
      </div>

      <div
        className={`relative z-10 flex flex-col gap-3 ${
        reversed ? 'md:order-1 md:items-end md:text-right' : 'md:order-2 md:items-start'}`
        }>
        
        {project.eyebrow && <p className="font-mono text-xs text-accent">{project.eyebrow}</p>}
        <h3 className="font-display text-2xl font-bold text-heading">{project.title}</h3>

        <div
          className={`w-full rounded-xl border border-line bg-white p-5 shadow-md md:w-[calc(100%+48px)] ${
          reversed ? 'md:-mr-12' : 'md:-ml-12'}`
          }>
          
          <p className="text-sm leading-6 text-body">{project.description}</p>
        </div>

        <ul className={`flex flex-wrap gap-2 ${reversed ? 'md:justify-end' : ''}`}>
          {project.tech.map((t) =>
          <li key={t} className="rounded bg-secondary px-2 py-1 font-mono text-xs text-chip">
              {t}
            </li>
          )}
        </ul>

        {project.link &&
        <a
          href={project.link.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-heading transition-opacity hover:opacity-70">
          
            {project.link.icon === 'github' ?
          <GithubIcon className="h-4 w-4" aria-hidden="true" /> :

          <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
          }
            {project.link.label}
          </a>
        }

        {project.note &&
        <span className="inline-flex items-center gap-2 rounded-lg bg-secondary px-2 py-1.5 text-sm font-medium text-body">
            <LockIcon className="h-4 w-4" aria-hidden="true" />
            {project.note}
          </span>
        }
      </div>
    </article>);

}

export function Projects() {
  return (
    <section id="projects" className="w-full border-b border-line bg-white px-6">
      <div className="mx-auto w-full max-w-[896px] pb-24 md:pb-28">
        <SectionHeading number="03." title="Featured Work" />

        <div className="space-y-20 md:space-y-28">
          {PROJECTS.map((project, i) =>
          <ProjectRow key={project.title} project={project} reversed={i % 2 === 1} />
          )}
        </div>
      </div>
    </section>);

}