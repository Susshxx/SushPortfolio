import React from 'react';

type SectionHeadingProps = {
  number: string;
  title: string;
};

export function SectionHeading({ number, title }: SectionHeadingProps) {
  return (
    <div className="sticky top-[84px] z-30 mb-10">
      {/* Full-bleed opaque backdrop so the incoming heading fully covers the outgoing one */}
      <span
        className="absolute left-1/2 top-0 -z-10 h-full w-screen -translate-x-1/2 bg-white"
        aria-hidden="true" />
      
      <h2 className="flex items-center gap-3 py-5">
        <span className="font-mono text-xl text-accent md:text-2xl">{number}</span>
        <span className="font-display text-3xl font-bold text-heading md:text-[36px] md:leading-10">
          {title}
        </span>
      </h2>
    </div>);

}