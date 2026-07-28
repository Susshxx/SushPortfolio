import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';

type SkillGroup = {
  title: string;
  items: string[];
  color: string;
};

const GROUPS: SkillGroup[] = [
{ title: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React'], color: 'bg-yellow-200 dark:bg-yellow-700' },
{ title: 'Backend', items: ['Node.js', 'Express', 'PHP'], color: 'bg-pink-200 dark:bg-pink-700' },
{ title: 'Database', items: ['MongoDB', 'Firebase', 'SQL'], color: 'bg-blue-200 dark:bg-blue-700' },
{ title: 'Languages', items: ['JavaScript', 'Python', 'Java', 'C#'], color: 'bg-green-200 dark:bg-green-700' },
{ title: 'Game Dev', items: ['Unity', 'C#'], color: 'bg-purple-200 dark:bg-purple-700' },
{ title: 'Design', items: ['Figma', 'Canva'], color: 'bg-orange-200 dark:bg-orange-700' },
{
  title: 'Other',
  items: ['Git', 'REST APIs', 'Responsive Design', 'API Testing'],
  color: 'bg-teal-200 dark:bg-teal-700'
},
{
  title: 'Project Management',
  items: ['Jira', 'Trello', 'Slack'],
  color: 'bg-indigo-200 dark:bg-indigo-700'
}];


const ROTATIONS = [-3, -2, -1, 1, 2, 3, -2.5, 1.5];


export function Skills() {
  return (
    <section id="skills" className="w-full border-b border-line bg-amber-50 dark:bg-amber-950 px-6">
      <div className="mx-auto w-full max-w-[896px] pb-24 md:pb-28">
        <SectionHeading number="02." title="Skills" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((group, index) => (
            <motion.div
              key={group.title}
              variants={{
                hidden: { opacity: 0, rotate: -10, scale: 0.8 },
                visible: { opacity: 1, rotate: ROTATIONS[index % ROTATIONS.length], scale: 1 }
              }}
              transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ 
                rotate: 0, 
                scale: 1.05, 
                y: -8,
                zIndex: 50
              }}
              style={{ 
                rotate: ROTATIONS[index % ROTATIONS.length] 
              }}
              className={`${group.color} dark:bg-opacity-80 p-6 shadow-lg relative z-10 dark:shadow-xl`}>
              
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-black/10 dark:bg-white/10 rounded-full" />
              
              <h3 className="font-display text-xl font-bold text-heading dark:text-white mb-4 font-handwriting">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item, itemIndex) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: (index * 0.1) + (itemIndex * 0.05) }}
                    whileHover={{ scale: 1.15 }}
                    className="px-3 py-1.5 text-sm font-medium text-heading dark:text-white bg-white/50 dark:bg-white/20 rounded shadow-sm cursor-pointer relative z-20">
                      {item}
                  </motion.li>
                ))}
              </ul>
              
              <div className="absolute bottom-3 right-3 w-2 h-2 bg-red-400 dark:bg-red-600 rounded-full shadow-sm" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>);

}