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

import { useState, useEffect } from 'react';
import { ExternalLinkIcon, GithubIcon, LockIcon } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { getAllProjects, type Project as DBProject } from '../lib/projectService';

type Project = DBProject & {
  visual?: React.ReactNode;
};

function DieraVisual() {
  return (
    <a 
      href="https://dierashop.com/" 
      target="_blank" 
      rel="noreferrer"
      className="project-panel relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#FBE9F0] cursor-pointer hover:opacity-90 transition-opacity border border-gray-200"
    >
      <img
        src="/diera_logo.png"
        alt="Diera.Shop Logo"
        className="h-full w-full object-cover"
      />
    </a>
  );
}

function LifeFlowVisual() {
  return (
    <a 
      href="https://lifeflow-uj6d.onrender.com/" 
      target="_blank" 
      rel="noreferrer"
      className="project-panel relative flex h-full w-full flex-col items-center justify-center bg-[#FBEDEC] cursor-pointer hover:opacity-90 transition-opacity border border-gray-200"
    >
      <img
        src="/lifeflow.png"
        alt="LifeFlow Logo"
        className="h-full w-full object-cover"
      />
    </a>
  );
}

function CustomProjectVisual({ imageUrl, title }: { imageUrl?: string; title: string }) {
  if (imageUrl) {
    return (
      <div className="project-panel relative flex h-full w-full items-center justify-center overflow-hidden bg-gray-100 border border-gray-200">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  
  return (
    <div className="project-panel flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200">
      <div className="text-center p-4">
        <p className="text-2xl font-bold text-gray-400">{title}</p>
      </div>
    </div>
  );
}

function AirWaysVisual() {
  return (
    <a 
      href="https://github.com/Susshxx/colab" 
      target="_blank" 
      rel="noreferrer"
      className="project-panel flex h-full w-full items-center justify-center gap-4 bg-gradient-to-b from-[#A8CFED] to-[#E8F1FA] cursor-pointer hover:opacity-90 transition-opacity border border-gray-200 overflow-hidden relative"
    >
      {/* Sun */}
      <div className="absolute top-6 right-8 w-12 h-12 bg-yellow-300 rounded-full opacity-80 shadow-lg"></div>
      
      {/* Clouds - Multiple layers */}
      <div className="absolute top-4 left-8 w-20 h-10 bg-white/60 rounded-full blur-sm"></div>
      <div className="absolute top-6 left-12 w-16 h-8 bg-white/60 rounded-full blur-sm"></div>
      
      <div className="absolute top-20 right-12 w-24 h-12 bg-white/50 rounded-full blur-sm"></div>
      <div className="absolute top-22 right-16 w-18 h-9 bg-white/50 rounded-full blur-sm"></div>
      
      <div className="absolute bottom-16 left-16 w-18 h-9 bg-white/40 rounded-full blur-sm"></div>
      <div className="absolute bottom-14 left-20 w-14 h-7 bg-white/40 rounded-full blur-sm"></div>
      
      <div className="absolute top-32 left-[40%] w-16 h-8 bg-white/50 rounded-full blur-sm"></div>
      
      {/* Mountains/Landscape at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#5A8CAD] to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-[10%] w-32 h-20 bg-[#7BA3C0] opacity-40" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
      <div className="absolute bottom-0 right-[15%] w-40 h-24 bg-[#7BA3C0] opacity-40" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
      
      {/* Animated Plane */}
      <div className="animate-[takeoff_6s_ease-in-out_infinite]">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="h-24 w-24 text-[#4A6F8A] drop-shadow-lg"
        >
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
        </svg>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes takeoff {
          0% { 
            transform: translate(-80px, 50px) rotate(-20deg); 
            opacity: 0.5;
          }
          50% { 
            transform: translate(0px, -10px) rotate(0deg); 
            opacity: 1;
          }
          100% { 
            transform: translate(80px, -70px) rotate(20deg); 
            opacity: 0.4;
          }
        }
      `}} />
    </a>
  );
}

function GameVisual() {
  return (
    <div className="project-panel flex h-full w-full items-center justify-center bg-gradient-to-b from-[#D4EDE0] to-[#C8E6D7] overflow-hidden relative border border-gray-200">
      {/* Sky/Hills Background */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#E4F4EB] to-[#D4EDE0]"></div>
      
      {/* Hills */}
      <div className="absolute bottom-[40%] left-0 w-full h-32">
        <div className="absolute bottom-0 left-[10%] w-40 h-20 bg-[#9FD3BB] rounded-t-full opacity-40"></div>
        <div className="absolute bottom-0 right-[15%] w-48 h-24 bg-[#9FD3BB] rounded-t-full opacity-30"></div>
      </div>
      
      {/* Road with two lanes */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-[#6B7D6F]">
        {/* Road edges */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#4A5A4D]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#4A5A4D]"></div>
        
        {/* Center lane divider - dashed yellow */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0.5 flex gap-6 animate-[scroll_2s_linear_infinite]">
          <div className="min-w-10 h-0.5 bg-yellow-400"></div>
          <div className="min-w-10 h-0.5 bg-yellow-400"></div>
          <div className="min-w-10 h-0.5 bg-yellow-400"></div>
          <div className="min-w-10 h-0.5 bg-yellow-400"></div>
          <div className="min-w-10 h-0.5 bg-yellow-400"></div>
          <div className="min-w-10 h-0.5 bg-yellow-400"></div>
          <div className="min-w-10 h-0.5 bg-yellow-400"></div>
          <div className="min-w-10 h-0.5 bg-yellow-400"></div>
          <div className="min-w-10 h-0.5 bg-yellow-400"></div>
          <div className="min-w-10 h-0.5 bg-yellow-400"></div>
        </div>
      </div>
      
      {/* Car 1 - Bottom lane going right */}
      <div className="absolute bottom-4 animate-[carGoRight_6s_linear_infinite]">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 64 64" 
          className="h-14 w-14 text-[#6BAF8D] drop-shadow-lg"
          fill="currentColor"
        >
          <path d="M52 30h-4l-4-8h-8v-4h-8v4h-8l-4 8h-4c-2.2 0-4 1.8-4 4v12c0 2.2 1.8 4 4 4h2c0 3.3 2.7 6 6 6s6-2.7 6-6h16c0 3.3 2.7 6 6 6s6-2.7 6-6h2c2.2 0 4-1.8 4-4V34c0-2.2-1.8-4-4-4zM20 50c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm24 0c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm8-16H12v-4l3-6h34l3 6v4z"/>
        </svg>
      </div>
      
      {/* Car 2 - Top lane going left (flipped) */}
      <div className="absolute bottom-16 animate-[carGoLeft_6s_linear_infinite]">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 64 64" 
          className="h-14 w-14 text-[#5A8D75] drop-shadow-lg"
          fill="currentColor"
          style={{ transform: 'scaleX(-1)' }}
        >
          <path d="M52 30h-4l-4-8h-8v-4h-8v4h-8l-4 8h-4c-2.2 0-4 1.8-4 4v12c0 2.2 1.8 4 4 4h2c0 3.3 2.7 6 6 6s6-2.7 6-6h16c0 3.3 2.7 6 6 6s6-2.7 6-6h2c2.2 0 4-1.8 4-4V34c0-2.2-1.8-4-4-4zM20 50c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm24 0c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm8-16H12v-4l3-6h34l3 6v4z"/>
        </svg>
      </div>
      
      {/* Trees */}
      <div className="absolute bottom-28 left-[15%]">
        <div className="w-3 h-8 bg-[#7A9985]"></div>
        <div className="w-8 h-8 bg-[#9FD3BB] rounded-full -mt-6 -ml-2.5"></div>
      </div>
      <div className="absolute bottom-28 right-[20%]">
        <div className="w-3 h-6 bg-[#7A9985]"></div>
        <div className="w-6 h-6 bg-[#9FD3BB] rounded-full -mt-4 -ml-1.5"></div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes carGoRight {
          0% { 
            transform: translateX(-150%); 
          }
          100% { 
            transform: translateX(calc(100vw + 150%)); 
          }
        }
        @keyframes carGoLeft {
          0% { 
            transform: translateX(calc(100vw + 150%)); 
          }
          100% { 
            transform: translateX(-150%); 
          }
        }
        @keyframes scroll {
          0% { 
            transform: translateX(0); 
          }
          100% { 
            transform: translateX(-76px); 
          }
        }
      `}} />
    </div>
  );
}

const STATIC_PROJECTS: Project[] = [
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
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const dbProjects = await getAllProjects();
        if (dbProjects.length > 0) {
          // Map database projects to include visual components
          const projectsWithVisuals = dbProjects.map((proj) => {
            let visual;
            if (proj.title === 'Diera Shop') {
              visual = <DieraVisual />;
            } else if (proj.title === 'LifeFlow') {
              visual = <LifeFlowVisual />;
            } else if (proj.title === 'AirWays') {
              visual = <AirWaysVisual />;
            } else if (proj.title === 'Game Dev Projects') {
              visual = <GameVisual />;
            } else {
              visual = <CustomProjectVisual imageUrl={proj.imageUrl} title={proj.title} />;
            }
            return { ...proj, visual };
          });
          setProjects(projectsWithVisuals);
        }
      } catch (error) {
        console.error('Failed to load projects from database, using static data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="w-full border-b border-line bg-white px-6">
        <div className="mx-auto w-full max-w-[896px] pb-24 md:pb-28">
          <SectionHeading number="03." title="Featured Work" />
          <div className="text-center py-12">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="w-full border-b border-line bg-white px-6">
      <div className="mx-auto w-full max-w-[896px] pb-24 md:pb-28">
        <SectionHeading number="03." title="Featured Work" />

        <div className="space-y-20 md:space-y-28">
          {projects.map((project, i) =>
          <ProjectRow key={project.id || project.title} project={project} reversed={i % 2 === 1} />
          )}
        </div>
      </div>
    </section>);

}