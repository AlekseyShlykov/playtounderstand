export type ProjectStatus = 'live' | 'coming-soon';

export type Project = {
  title: string;
  description: string;
  url: string;
  image: string;
  imageAlt: string;
  imageSvg?: string;
  tags: string[];
  duration?: string;
  status?: ProjectStatus;
};

const wash = (seed: string) => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" role="img" aria-label="${seed}">
    <defs>
      <filter id="blur">
        <feGaussianBlur stdDeviation="28" />
      </filter>
      <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fbfaf6"/>
        <stop offset="1" stop-color="#f4f1ea"/>
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#paper)" />
    <g filter="url(#blur)" opacity="0.85">
      <path d="M120 160 C 220 60, 360 60, 460 150 C 560 240, 540 350, 420 380 C 300 410, 180 320, 120 250 Z" fill="#b9d6d9"/>
      <path d="M420 120 C 540 70, 690 120, 720 230 C 750 340, 650 420, 520 390 C 390 360, 320 210, 420 120 Z" fill="#d7c5e8"/>
      <path d="M220 330 C 260 280, 340 260, 400 300 C 460 340, 440 410, 360 430 C 280 450, 220 400, 220 330 Z" fill="#e7d7b2"/>
    </g>
    <g opacity="0.85">
      <path d="M0 435 C 180 405, 360 505, 800 420 L 800 500 L 0 500 Z" fill="#efe9dd"/>
    </g>
  </svg>
`;

export const projects: Project[] = [
  {
    title: 'The Choice',
    description: 'An interactive journey through the foundations of moral philosophy',
    url: 'https://thechoice.quest/',
    image: '/thechoice.png',
    imageAlt: 'Preview image for The Choice',
    imageSvg: wash('The Choice cover'),
    tags: ['ethics', 'philosophy'],
    duration: '~20 min',
    status: 'live',
  },
  {
    title: 'The Evolution of Civilizations',
    description: 'Trace the forces that shaped the rise and fall of civilizations',
    url: 'https://evolutionofcivilizations.earth/',
    image: '/theworld.png',
    imageAlt: 'Preview image for Evolution of Civilizations',
    imageSvg: wash('Evolution of Civilizations cover'),
    tags: ['history'],
    duration: '~20 min',
    status: 'live',
  },
  {
    title: 'How the Brain Shapes Behavior',
    description: 'Discover which brain systems drive your everyday decisions',
    url: 'https://buildtounderstand.dev/thebrain/',
    image: '/thebrain.png',
    imageAlt: 'Preview image for How the Brain Shapes Behavior',
    imageSvg: wash('How the Brain Shapes Behavior cover'),
    tags: ['biology', 'psychology'],
    duration: '~5 min',
    status: 'live',
  },
  {
    title: 'Reasonable Doubt',
    description:
      'A decision-based game about AI, predictive justice, and the ethics of judging guilt based on incomplete information.',
    url: '#',
    image: '/preview.png',
    imageAlt: 'Preview image for Reasonable Doubt',
    imageSvg: wash('Reasonable Doubt cover'),
    tags: ['philosophy'],
    duration: 'Coming soon',
    status: 'coming-soon',
  },
];

