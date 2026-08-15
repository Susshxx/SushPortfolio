// Seed data for initial database population

export const SEED_PROJECTS = [
  {
    eyebrow: 'Featured Project',
    title: 'Diera Shop',
    description:
      'A full-featured fashion e-commerce platform with curated clothing collections — Bags, Caps, Hoodies, Shoes, Slippers, T-shirts, and Trousers. Features product browsing, category filtering, a shopping cart, and a clean storefront experience.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: { label: 'Live Demo', href: 'https://dierashop.com/', icon: 'external' as const },
    imageUrl: '/diera_logo.png',
  },
  {
    eyebrow: 'Featured Project',
    title: 'LifeFlow',
    description:
      'Full-stack blood donation platform connecting donors, recipients, and hospitals directly. Streamlines the process of finding matching blood types in emergencies.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    link: { label: 'Live Demo', href: 'https://lifeflow-uj6d.onrender.com/', icon: 'external' as const },
    imageUrl: '/lifeflow.png',
  },
  {
    title: 'AirWays',
    description:
      'Real-time collaboration platform built with a dedicated team. Served as Project Manager and Full Stack Developer to deliver a seamless user experience.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    link: { label: 'GitHub', href: 'https://github.com/Susshxx/colab', icon: 'github' as const },
  },
  {
    title: 'Game Dev Projects',
    description:
      'Various 2D/3D game prototypes developing mechanics, physics, and complex UI systems from scratch. Focused on gameplay feel and optimized performance.',
    tech: ['Unity', 'C#'],
    note: 'Personal Projects',
  },
];

export const SEED_SKILLS = [
  { title: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React'], color: 'bg-yellow-200' },
  { title: 'Backend', items: ['Node.js', 'Express', 'PHP'], color: 'bg-pink-200' },
  { title: 'Database', items: ['MongoDB', 'Firebase', 'SQL'], color: 'bg-blue-200' },
  { title: 'Languages', items: ['JavaScript', 'Python', 'Java', 'C#'], color: 'bg-green-200' },
  { title: 'Game Dev', items: ['Unity', 'C#'], color: 'bg-purple-200' },
  { title: 'Design', items: ['Figma', 'Canva'], color: 'bg-orange-200' },
  {
    title: 'Other',
    items: ['Git', 'REST APIs', 'Responsive Design', 'API Testing'],
    color: 'bg-teal-200',
  },
  {
    title: 'Project Management',
    items: ['Jira', 'Trello', 'Slack'],
    color: 'bg-indigo-200',
  },
];

export const SEED_EDUCATION = [
  {
    degree: 'Bachelor of Computer Science (BCS Hons)',
    school: 'Herald College Kathmandu',
    period: '2023 – Present',
    description:
      'Focused on full-stack development, software engineering principles, and system architecture. Engaging in practical projects and modern tech stacks.',
  },
  {
    degree: '+2 Science (Physical)',
    school: 'Nist College, Kathmandu',
    period: '2019 – 2021',
    description:
      'Completed with a GPA of 3.25. Built a strong foundation in physics, mathematics, and analytical problem-solving.',
  },
];
