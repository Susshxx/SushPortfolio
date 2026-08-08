// import React, { useState, useEffect } from 'react';
// import { ExternalLinkIcon, GithubIcon, LockIcon, MonitorIcon, SmartphoneIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
// import { SectionHeading } from './SectionHeading';

// function PreviewButtons({ url }: { url: string }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [device, setDevice] = useState<'desktop' | 'mobile'>('mobile');

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [isOpen]);

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   const handleBackdropClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       handleClose();
//     }
//   };

//   return (
//     <>
//       {/* Preview Option Buttons */}
//       <div className="flex items-center justify-center gap-4 mb-[10px]">
//         {/* Mobile Preview Button - Always visible */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setDevice('mobile');
//             setIsOpen(true);
//           }}
//           className="group flex h-12 w-12 flex-col items-center justify-center rounded-full bg-white shadow-md transition-all hover:shadow-lg hover:scale-105"
//         >
//           <SmartphoneIcon className="h-5 w-5 text-gray-700 group-hover:text-[#B4718B] transition-colors" strokeWidth={1.5} />
//         </button>

//         {/* Desktop Preview Button - Hidden on small screens */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setDevice('desktop');
//             setIsOpen(true);
//           }}
//           className="group hidden md:flex h-12 w-12 flex-col items-center justify-center rounded-full bg-white shadow-md transition-all hover:shadow-lg hover:scale-105"
//         >
//           <MonitorIcon className="h-5 w-5 text-gray-700 group-hover:text-[#B4718B] transition-colors" strokeWidth={1.5} />
//         </button>
//       </div>

//       {/* Preview Modal */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/95 p-4"
//           onClick={handleBackdropClick}
//         >
//           <div className="relative w-full h-full max-w-7xl flex items-center justify-center">
            
//             {/* Device Switcher Buttons - Right Side */}
//             <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setDevice('desktop');
//                 }}
//                 className={`hidden md:flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${
//                   device === 'desktop' 
//                     ? 'bg-teal-500 text-white shadow-lg' 
//                     : 'bg-gray-700 text-white hover:bg-gray-600'
//                 }`}
//               >
//                 <MonitorIcon className="h-5 w-5" />
//                 Mac
//               </button>
              
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setDevice('mobile');
//                 }}
//                 className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${
//                   device === 'mobile' 
//                     ? 'bg-teal-500 text-white shadow-lg' 
//                     : 'bg-gray-700 text-white hover:bg-gray-600'
//                 }`}
//               >
//                 <SmartphoneIcon className="h-5 w-5" />
//                 Phone
//               </button>
//             </div>

//             {/* Preview Container */}
//             <div
//               className="relative"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {device === 'mobile' ? (
//                 // Mobile Device Frame
//                 <div className="relative bg-gray-900 rounded-[3rem] p-4 shadow-2xl" style={{ width: '380px', height: '760px' }}>
//                   {/* Phone Notch */}
//                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-gray-900 rounded-b-3xl z-10"></div>
                  
//                   {/* Screen */}
//                   <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden preview-scrollbar">
//                     <iframe
//                       src={url}
//                       className="w-full h-full border-0"
//                       title="Mobile Preview"
//                       sandbox="allow-scripts allow-same-origin"
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 // Desktop Browser Frame
//                 <div className="relative bg-gray-800 rounded-xl shadow-2xl overflow-hidden" style={{ width: '1000px', height: '650px' }}>
//                   {/* Browser Chrome */}
//                   <div className="flex items-center gap-2 bg-gray-200 px-4 py-3 border-b border-gray-300">
//                     {/* Traffic Lights */}
//                     <div className="flex items-center gap-2">
//                       <div className="h-3 w-3 rounded-full bg-red-500"></div>
//                       <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
//                       <div className="h-3 w-3 rounded-full bg-green-500"></div>
//                     </div>

//                     {/* URL Bar */}
//                     <div className="flex-1 ml-4 mr-4">
//                       <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 border border-gray-300">
//                         <ChevronLeftIcon className="h-4 w-4 text-gray-400" />
//                         <ChevronRightIcon className="h-4 w-4 text-gray-400" />
//                         <div className="flex-1 text-sm text-gray-700 truncate">{url}</div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="h-[calc(100%-52px)] bg-white overflow-auto preview-scrollbar">
//                     <iframe
//                       src={url}
//                       className="w-full h-full border-0"
//                       title="Desktop Preview"
//                       sandbox="allow-scripts allow-same-origin"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// type Project = {
//   eyebrow?: string;
//   title: string;
//   description: string;
//   tech: string[];
//   link?: {label: string;href: string;icon: 'external' | 'github';};
//   note?: string;
//   visual: React.ReactNode;
//   liveUrl?: string;
// };

// function DieraVisual({ liveUrl }: { liveUrl?: string }) {
//   return (
//     <div className="project-panel relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-[#FBE9F0] py-6">
//       <div className="flex-1 flex flex-col items-center justify-center">
//         <img
//           src="/diera_logo.png"
//           alt="Diera.Shop Logo"
//           className="h-32 w-auto object-contain"
//         />
//         <span className="mt-4 text-sm font-medium text-[#B4718B]">Diera Shop</span>
//       </div>
      
//       {/* Preview Buttons */}
//       {liveUrl && <PreviewButtons url={liveUrl} />}
//     </div>
//   );
// }

// function LifeFlowVisual({ liveUrl }: { liveUrl?: string }) {
//   return (
//     <div className="project-panel relative flex h-full w-full flex-col items-center justify-between bg-[#FBEDEC] py-6">
//       <div className="flex-1 flex flex-col items-center justify-center">
//         <img
//           src="/lifeflow.png"
//           alt="LifeFlow Logo"
//           className="h-32 w-auto object-contain"
//         />
//         <span className="mt-4 text-sm font-medium text-[#B4718B]">LifeFlow</span>
//       </div>
      
//       {/* Preview Buttons */}
//       {liveUrl && <PreviewButtons url={liveUrl} />}
//     </div>
//   );
// }

// function AirWaysVisual() {
//   return (
//     <div className="project-panel flex h-full w-full items-center justify-center gap-4 bg-[#E8F1FA]">
//       <div className="h-12 w-12 rounded-lg bg-[#D5DEE8]" />
//       <div className="h-12 w-12 rounded-lg bg-[#A8DAD5]" />
//       <div className="h-12 w-12 rounded-lg bg-[#D5DEE8]" />
//     </div>);

// }

// function GameVisual() {
//   return (
//     <div className="project-panel flex h-full w-full items-center justify-center bg-[#E4F4EB]">
//       <div className="flex h-[72px] w-20 flex-wrap content-start gap-2 rounded-lg bg-[#CDE9DA] p-2.5">
//         <div className="h-4 w-full rounded bg-[#9FD3BB]" />
//         <div className="h-5 w-6 rounded bg-[#9FD3BB]" />
//         <div className="h-5 w-6 rounded bg-[#9FD3BB]" />
//       </div>
//     </div>);

// }

// const PROJECTS: Project[] = [
// {
//   eyebrow: 'Featured Project',
//   title: 'Diera Shop',
//   description:
//   'A full-featured fashion e-commerce platform with curated clothing collections — Bags, Caps, Hoodies, Shoes, Slippers, T-shirts, and Trousers. Features product browsing, category filtering, a shopping cart, and a clean storefront experience.',
//   tech: ['React', 'Node.js', 'MongoDB', 'Express'],
//   link: { label: 'Live Demo', href: "https://dierashop.com/", icon: 'external' },
//   liveUrl: "https://dierashop.com/",
//   visual: <DieraVisual liveUrl="https://dierashop.com/" />
// },
// {
//   eyebrow: 'Featured Project',
//   title: 'LifeFlow',
//   description:
//   'Full-stack blood donation platform connecting donors, recipients, and hospitals directly. Streamlines the process of finding matching blood types in emergencies.',
//   tech: ['MongoDB', 'Express', 'React', 'Node.js'],
//   link: { label: 'Live Demo', href: "https://lifeflow-uj6d.onrender.com/", icon: 'external' },
//   liveUrl: "https://lifeflow-uj6d.onrender.com/",
//   visual: <LifeFlowVisual liveUrl="https://lifeflow-uj6d.onrender.com/" />
// },
// {
//   title: 'AirWays',
//   description:
//   'Real-time collaboration platform built with a dedicated team. Served as Project Manager and Full Stack Developer to deliver a seamless user experience.',
//   tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
//   link: { label: 'GitHub', href: 'https://github.com/Susshxx/colab', icon: 'github' },
//   visual: <AirWaysVisual />
// },
// {
//   title: 'Game Dev Projects',
//   description:
//   'Various 2D/3D game prototypes developing mechanics, physics, and complex UI systems from scratch. Focused on gameplay feel and optimized performance.',
//   tech: ['Unity', 'C#'],
//   note: 'Personal Projects',
//   visual: <GameVisual />
// }];


// function ProjectRow({ project, reversed }: {project: Project;reversed: boolean;}) {
//   return (
//     <article className="grid items-center gap-10 md:grid-cols-2 md:gap-6">
//       <div className={reversed ? 'md:order-2' : 'md:order-1'}>
//         <div className="h-[240px] overflow-hidden rounded-2xl">{project.visual}</div>
//       </div>

//       <div
//         className={`relative z-10 flex flex-col gap-3 ${
//         reversed ? 'md:order-1 md:items-end md:text-right' : 'md:order-2 md:items-start'}`
//         }>
        
//         {project.eyebrow && <p className="font-mono text-xs text-accent">{project.eyebrow}</p>}
//         <h3 className="font-display text-2xl font-bold text-heading">{project.title}</h3>

//         <div
//           className={`w-full rounded-xl border border-line bg-white p-5 shadow-md md:w-[calc(100%+48px)] ${
//           reversed ? 'md:-mr-12' : 'md:-ml-12'}`
//           }>
          
//           <p className="text-sm leading-6 text-body">{project.description}</p>
//         </div>

//         <ul className={`flex flex-wrap gap-2 ${reversed ? 'md:justify-end' : ''}`}>
//           {project.tech.map((t) =>
//           <li key={t} className="rounded bg-secondary px-2 py-1 font-mono text-xs text-chip">
//               {t}
//             </li>
//           )}
//         </ul>

//         {project.link &&
//         <a
//           href={project.link.href}
//           target="_blank"
//           rel="noreferrer"
//           className="inline-flex items-center gap-2 text-sm font-medium text-heading transition-opacity hover:opacity-70">
          
//             {project.link.icon === 'github' ?
//           <GithubIcon className="h-4 w-4" aria-hidden="true" /> :

//           <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
//           }
//             {project.link.label}
//           </a>
//         }

//         {project.note &&
//         <span className="inline-flex items-center gap-2 rounded-lg bg-secondary px-2 py-1.5 text-sm font-medium text-body">
//             <LockIcon className="h-4 w-4" aria-hidden="true" />
//             {project.note}
//           </span>
//         }
//       </div>
//     </article>);

// }

// export function Projects() {
//   return (
//     <section id="projects" className="w-full border-b border-line bg-white px-6">
//       <div className="mx-auto w-full max-w-[896px] pb-24 md:pb-28">
//         <SectionHeading number="03." title="Featured Work" />

//         <div className="space-y-20 md:space-y-28">
//           {PROJECTS.map((project, i) =>
//           <ProjectRow key={project.title} project={project} reversed={i % 2 === 1} />
//           )}
//         </div>
//       </div>
//     </section>);

// }

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