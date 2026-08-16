import { useState, useEffect } from 'react';
import { GraduationCapIcon } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { getAllEducation, type Education } from '../lib/educationService';

const STATIC_EDUCATION: Education[] = [
{
  degree: 'Bachelor of Computer Science (BCS Hons)',
  school: 'Herald College Kathmandu',
  period: '2023 – Present',
  description:
  'Focused on full-stack development, software engineering principles, and system architecture. Engaging in practical projects and modern tech stacks.'
},
{
  degree: '+2 Science (Physical)',
  school: 'Nist College, Kathmandu',
  period: '2019 – 2021',
  description:
  'Completed with a GPA of 3.25. Built a strong foundation in physics, mathematics, and analytical problem-solving.'
}];

export function Education() {
  const [education, setEducation] = useState<Education[]>(STATIC_EDUCATION);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEducation = async () => {
      try {
        const dbEducation = await getAllEducation();
        if (dbEducation.length > 0) {
          setEducation(dbEducation);
        }
      } catch (error) {
        console.error('Failed to load education from database, using static data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEducation();
  }, []);

  if (loading) {
    return (
      <section id="education" className="w-full border-b border-line bg-white px-6">
        <div className="mx-auto w-full max-w-[896px] pb-24 md:pb-28">
          <SectionHeading number="04." title="Education" />
          <div className="text-center py-12">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="w-full border-b border-line bg-white px-6">
      <div className="mx-auto w-full max-w-[896px] pb-24 md:pb-28">
        <SectionHeading number="04." title="Education" />

        <ol className="relative space-y-12">
          <span
            className="absolute left-[19px] top-2 hidden h-[calc(100%-16px)] w-px bg-line sm:block"
            aria-hidden="true" />
          

          {education.map((entry) =>
          <li key={entry.id || entry.degree} className="relative flex gap-6">
              <span className="relative z-10 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-white sm:flex">
                <GraduationCapIcon className="h-[18px] w-[18px] text-accent" aria-hidden="true" />
              </span>

              <div className="relative flex-1 overflow-hidden rounded-xl border border-line bg-white p-6 shadow-sm">
                <span className="absolute left-0 top-0 h-full w-1 bg-accent" aria-hidden="true" />
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-bold text-heading">{entry.degree}</h3>
                    <p className="text-base font-medium text-accent">{entry.school}</p>
                  </div>
                  <span className="rounded-full bg-secondary px-3 py-1 font-mono text-sm text-chip">
                    {entry.period}
                  </span>
                </div>
                <p className="mt-4 text-base leading-6 text-body">{entry.description}</p>
              </div>
            </li>
          )}
        </ol>
      </div>
    </section>);

}