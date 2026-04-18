// ─── MODEL ──────────────────────────────────────────────────────────────────
// All static content / data for the Get Hyped website

const AppData = {
  nav: {
    links: [
      { label: 'Expertises', href: '#expertises' },
      { label: 'Work',       href: '#work'       },
      { label: 'About',      href: '#about'       },
      { label: 'Contact',    href: '#contact'     },
    ],
    cta: { label: 'Get Results', href: '#contact' },
  },

  hero: {
    heading: ['Get Hyped.', 'Get Noticed.', 'Get Results.'],
    subtext: 'Klaar met gokken op content\ndie niets oplevert?',
    stats: [
      { type: 'stat',  value: '10M+',  color: '#4ab3f4' },
      { type: 'photo', src: 'assets/images/hero1.jpg', alt: 'influencer' },
      { type: 'stat',  value: '30+',   color: '#3ecfaf' },
      { type: 'photo', src: 'assets/images/hero2.jpg', alt: 'car interior' },
      { type: 'stat',  value: '10M+',  color: '#4ab3f4' },
      { type: 'photo', src: 'assets/images/hero3.jpg', alt: 'champagne' },
      { type: 'stat',  value: '30+',   color: '#3ecfaf' },
      { type: 'photo', src: 'assets/images/hero4.jpg', alt: 'building' },
    ],
  },

  about: {
    statement: 'Wij maken content die opvalt. Die blijft hangen. Die jouw doelgroep raakt en jouw merk in beweging brengt. Snel, krachtig en energiek.',
    body: 'We stoppen niet bij mooie plaatjes en vette beelden. We maken het meetbaar. Zo weet je precies wat werkt en wat niet. Nooit meer content zonder strategie. Nooit meer content zonder resultaat.',
    cta: { label: 'Leer ons kennen', href: '#about' },
    photo: 'assets/images/about-influencer.jpg',
  },

  work: {
    heading: 'Content\ndat scoort.',
    subtext: 'Wij vertellen jouw verhaal. Op een manier die écht past bij jouw doelgroep. Met creatieve content die werkt en het verschil maakt.',
    cta: { label: 'Bekijk al ons werk', href: '#work' },
    cards: [
      { src: 'assets/images/work1.jpg', alt: 'project 1', border: '#e8461e' },
      { src: 'assets/images/work2.jpg', alt: 'project 2', border: '#4ab3f4' },
      { src: 'assets/images/work3.jpg', alt: 'project 3', border: '#3ecfaf' },
    ],
  },

  expertises: [
    {
      number: '01',
      tag: 'Expertise',
      title: 'Social strategy',
      tagline: 'Slimme strategie. Sterke start.',
      body: 'We duiken diep in jouw merk, doelgroep en doelen. En vertalen data naar een duidelijk plan met formats die écht impact maken. Zo weet je precies waarom het werkt.',
      cta: 'Meer over social strategie',
      bg: '#ffffff',
      image: 'assets/images/chess.jpg',
      imageBorder: '#e8461e',
    },
    {
      number: '02',
      tag: 'Expertise',
      title: 'Content creation',
      tagline: 'Content die opvalt en raakt.',
      body: 'We maken content die opvalt. Blijft hangen. En jouw doelgroep raakt. Creatief, snel en energiek. Altijd met het doel voor ogen.',
      cta: 'Meer over content creatie',
      bg: '#f0bef0',
      image: 'assets/images/event.jpg',
      imageBorder: '#d080d0',
    },
    {
      number: '03',
      tag: 'Expertise',
      title: 'Activation',
      tagline: 'Zichtbaar waar en wanneer het telt.',
      body: 'De juiste content verdient het om gezien te worden. We verspreiden de content waar jouw doelgroep is. Zo raakt jouw merk de juiste mensen, precies waar en wanneer het telt.',
      cta: 'Meer over activatie',
      bg: '#3ecfaf',
      image: 'assets/images/lamp.jpg',
      imageBorder: '#2ab090',
    },
  ],

  brands: {
    heading: 'These brands\ngot hyped.',
    logos: [
      { name: 'Graafschap College', color: '#1a4fa0' },
      { name: 'fides',              color: '#1a4fa0' },
      { name: '8RHK ambassadeurs',  color: '#2d8f3c' },
      { name: 'KNLTB',              color: '#e84020' },
      { name: 'Tho',                color: '#1a7a5e' },
      { name: 'Partner 6',          color: '#555'    },
    ],
  },

  contact: {
    heading: "Let's Get Hyped!",
    email: { label: 'Mail ons direct', href: 'mailto:info@gethyped.nl' },
    cta:   { label: 'Get Results',     href: '#contact' },
  },

  footer: {
    links: ['Expertises', 'Work', 'About', 'Contact'],
    contact: {
      email: 'info@gethyped.nl',
      phone: '+31 6 1533 7496',
    },
    address: {
      street: 'Beltrumsestraat 6,',
      city: '7141 AL Groenlo',
    },
    social: [
      { platform: 'linkedin',  href: '#' },
      { platform: 'tiktok',    href: '#' },
      { platform: 'instagram', href: '#' },
      { platform: 'youtube',   href: '#' },
    ],
    copy: '© 2025 Get Hyped',
    design: '© Design by Dylan',
    privacy: 'Privacyvoorwaarden',
  },
};
