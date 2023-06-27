import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  FlagIcon,
  MapIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import GithubIcon from '../components/Icon/GithubIcon';
import InstagramIcon from '../components/Icon/InstagramIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import heroImage from '../images/background-vancouver-night-grouse-2240.webp';
import porfolioImage1 from '../images/portfolio/raceface-home-bars.png';
import porfolioImage2 from '../images/portfolio/kali-interceptor.jpg';
import porfolioImage3 from '../images/portfolio/hayes-homepage.png';
import porfolioImage4 from '../images/portfolio/cooperators.png';
import porfolioImage5 from '../images/portfolio/petro-novus.png';
import porfolioImage6 from '../images/portfolio/manitoumtb-product-list.png';

import profilepic from '../images/profilepic.jpg';
import testimonialImage from '../images/testimonial.webp';
import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  PortfolioItem,
  SkillGroup,
  Social,
  TestimonialSection,
  TimelineItem,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Craig Pestell\'s Bio',
  description: "Craig Pestell's Resume, career experience, education, skills and interests",
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
  Testimonials: 'testimonials',
} as const;

export type SectionId = typeof SectionId[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage,
  name: `I'm Craig Pestell.`,
  description: (
    <>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I'm a <strong className="text-stone-100">Full Stack Software Engineer</strong>, based on the west coast, jumping between the San Francisco bay area and Vancouver Canada. I've built software since 1998, first in Vancouver, then in the San Francisco bay area from 2010 to 2021. I also freelance via my Canadian business, <strong className="text-stone-100">Koansoft</strong>.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        In my free time time, you can find me in Vancouver, Whistler, Lake Tahoe, Santa Cruz, or other destinations that offer great <strong className="text-stone-100">downhill mountain biking</strong> in the summer and <strong className="text-stone-100">snowboarding</strong> in the winter.
      </p>
    </>
  ),
  actions: [
    {
      href: '/assets/resume.pdf',
      text: 'Resume',
      primary: true,
      Icon: ArrowDownTrayIcon,
    },
    {
      href: `#${SectionId.Contact}`,
      text: 'Contact',
      primary: false,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {
  //profileImageSrc: profilepic,
  description: `I'm a Canadian citizen, born in Vancouver. I have built software professionally and full time since I finished high school in 1998. I took Computer Science at BCIT in Burnaby, B.C. from 2005 to 2007. I moved to San Francisco in 2010, and came back to Vancouver when many businesses shuttered in 2020. I'm still freelancing in Vancouver, but I'm shooting for another opportunity in California, or possibly Washington.`,
  aboutItems: [
    { label: 'Location', text: 'Vancouver, BC', Icon: MapIcon },
    { label: 'Age', text: '45', Icon: CalendarIcon },
    { label: 'Nationality', text: 'Canadian', Icon: FlagIcon },
    { label: 'Interests', text: 'Bikes, Motorcycles, Web technology, Pen Testing, Psychology', Icon: SparklesIcon },
    { label: 'Study', text: 'British Columbia Institute of Technology', Icon: AcademicCapIcon },
    { label: 'Employment', text: 'Looking for a new Full Stack Javascript/Typescript role, while maintaining my client projects at Koansoft in Vancouver Canada', Icon: BuildingOffice2Icon },
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Frontend development',
    skills: [
      {
        name: 'Vue',
        level: 7,
      },
      {
        name: 'React',
        level: 5,
      },
      {
        name: 'Typescript',
        level: 5,
      },
    ],
  },
  {
    name: 'Backend development',
    skills: [
      {
        name: 'Node.js',
        level: 7,
      },
      {
        name: 'Database',
        level: 9,
      },
    ],
  },
  {
    name: 'Administration / Deployment',
    skills: [
      {
        name: 'Linux',
        level: 8,
      },
      {
        name: 'Cloud',
        level: 5,
      },
    ],
  },
];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Kali Protectives (2019)',
    description: 'Kali Protectives catalogs for MTB and Moto disciplines, and marketing blog',
    url: 'https://kaliprotectives.com',
    image: porfolioImage2,
  },
  {
    title: 'Manitou MTB (2016)',
    description: 'Product catalog for Manitou MTB',
    url: 'https://manitoumtb.com',
    image: porfolioImage6,
  },
  {
    title: 'Race Face (2016)',
    description: 'Product catalog and athlete blog for Race Face Performance Products',
    url: 'https://raceface.com',
    image: porfolioImage1,
  },
  {
    title: 'Hayes Bicycle Group (2015)',
    description: 'Hayes group of companies multiple product catalog websites',
    url: 'https://hayesbicycle.com',
    image: porfolioImage3,
  },
  {
    title: 'Cooperators / TIC Travel Insurance (2013)',
    description: 'Cooperators websites providing insurance policy information and online claim submission',
    url: 'https://cooperators.ca',
    image: porfolioImage4,
  },
  {
    title: 'Petro Novus (2010)',
    description: 'Petro Novus investor information site',
    url: '',
    image: porfolioImage5,
  },
];

/**
 * Resume section -- TODO: Standardize resume contact format or offer MDX
 */
export const education: TimelineItem[] = [
  {
    date: '2004 - 2006',
    location: 'British Columbia Institute of Technology',
    title: 'Associate of Computer Science',
    content: <p>Completed a condensed 2 year Computer Science diploma program, with Data Communications option in 2nd year.</p>,
  },
];

export const experience: TimelineItem[] = [
  {
    date: 'March 2022 - October 2022',
    location: 'Google',
    title: 'Senior UI Developer',
    content: (
      <span>
        <p>
          Coordinating the design and development of a web application to provide silicon chip design teams the ability to manage chip specifications, including ongoing change management, similar to a code version control system.
        </p>
        <p>
          Technologies used: Typescript, Angular, RxJs, SASS/CSS, plus many Google-centric tools
        </p>
      </span>
    ),
  },
  {
    date: '2020 - 2021 -  Williams Sonoma',
    location: 'Remote',
    title: 'Senior UI Developer',
    content: (
      <span>
        <p>
          Architecting a micro-frontend ecosystem to transition e-commerce website pages from a monolithic code-base, to facilitate reusable components, built with Vue.js. Developing Vue.js components to port existing features and create new features for an e-commerce website.
        </p>
        <p>
          Technologies used: Node.js, Vue.js, NPM, HTML5, CSS3, Jest, Yeoman, Tailwind, SASS
        </p>
      </span>
    ),
  },
  {
    date: '2015 - 2020 - Macys.com',
    location: 'San Francisco, CA',
    title: 'Senior UI Developer',
    content: (
      <span>
        <p>
          Working within a LEAN environment our team is designing the future architecture of Macys.com.  My work involves designing a componentized, loosely coupled, scalable isometric architecture, creating tools to streamline developer onboarding and website development.
        </p>
        <p>
          Technologies used: Node.js, React, Backbone.js, Webpack, HTML5, CSS3, Foundation, Jasmine, Gulp, Grunt, Yeoman, SASS/SCSS, Adobe Analytics, Tealium
        </p>
      </span>
    ),
  },
  {
    date: '2016 - 2019 - Kali Protectives',
    location: 'Remote',
    title: 'Full Stack Developer',
    content: (
      <span>
        <p>
          As the sole developer working for Kali Protectives, I designed, developed and deployed a brand new catalog website to showcase Kali’s product line.  Using the latest tools, including ESNext Javascript, Webpack/Babel, Node.js with Express and MongoDB I designed a fully responsive website which included a product catalog and blog, administered with a custom CMS, enhanced with a customized implementation of TinyMCE        </p>
        <p>
          Technologies used: Custom CMS using Node.js/Express, Handlebars templates, TinyMCE, Cloudinary image management, Cloudflare
        </p>
      </span>
    ),
  },
  {
    date: '2014 - 2015 - Autodesk',
    location: 'San Francisco, CA',
    title: 'UI Developer',
    content: (
      <span>
        <p>
          Working within an Agile team I analyze business processes to design and build new features for a web portal single-page application to allow Autodesk to sell their software using a SaaS model.
        </p>
        <p>
          Technologies used: jQuery, Backbone.js, Require.js, Bootstrap, Node.js, HTML5, CSS3, Jasmine, Gulp, Grunt, LESS
        </p>
      </span>
    ),
  },
  {
    date: '2012 - 2014 - Google',
    location: 'Mountain View, CA',
    title: 'Software Engineer',
    content: (
      <span>
        <p>
          Google Unified Ticketing System- Work with a team to develop and maintain internal ticketing system.
        </p>
        <p>
          GUTS is a high performance application using several Google technologies that allows over 10,000 requests per second to over 10,000,000 records while maintaining 99.9% uptime.
        </p>
        <p>
          Technologies used:  Python, Javascript, Google Closures, Fava Framework, Oracle DB, BMC Remedy
        </p>
      </span>
    ),
  },
  {
    date: '2008 - 2016 - Race Face Performance Products',
    location: 'Remote',
    title: 'Web Developer',
    content: (
      <span>
        <p>
          Consult, develop and maintain Race Face's public, business and intranet web applications.</p>
        <p>Manage email marketing campaigns sending to thousands of recipients</p>
        <p>Create online product catalogues for public and distributors</p>
        <p>Technologies used: PHP, MySQL, Wordpress, JQuery, XHTML, CSS, Javascript</p>
      </span>
    ),
  },
  {
    date: '2009 - Hayes Bicycle Group',
    location: 'Remote',
    title: 'Web Developer',
    content: (
      <span>
        <p>
          Product showcase / catalog 
        </p>
        <p>
          http://www.hayesbicycle.com
        </p>
        <p>Technologies used: PHP, XML, Wordpress, XHTML, CSS, Javascript</p>
      </span>
    ),
  },
  {
    date: '2008 - 2010 - iWasteNot Systems',
    location: 'Remote',
    title: 'Web Developer',
    content: (
      <span>
        <p>
Web development for an environmental recycling web portal, used by private and local governments to reduce waste, save costs, and generate alternative energy.</p>
<p>https://www.iwastenotsystems.com</p>
<p>Technologies used: PHP, XML, XHTML, CSS, Javascript, SOAP</p></span>
    ),
  },
  
];

/**
 * Testimonial section
 */
export const testimonial: TestimonialSection = {
  imageSrc: testimonialImage,
  testimonials: [
    {
      name: 'John Doe',
      text: 'Use this as an opportunity to promote what it is like to work with you. High value testimonials include ones from current or past co-workers, managers, or from happy clients.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/169.jpg',
    },
    {
      name: 'Jane Doe',
      text: 'Here you should write some nice things that someone has said about you. Encourage them to be specific and include important details (notes about a project you were on together, impressive quality produced, etc).',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/14.jpg',
    },
    {
      name: 'Someone else',
      text: 'Add several of these, and keep them as fresh as possible, but be sure to focus on quality testimonials with strong highlights of your skills/work ethic.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/69.jpg',
    },
  ],
};

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Hit me up.',
  description: 'Need some problems solved? Call or email.',
  items: [
    {
      type: ContactType.Email,
      text: 'craigpestell@gmail.com',
      href: 'mailto:craigpestell@gmail.com',
    },
    {
      type: ContactType.Location,
      text: 'Vancouver BC, Canada',
      href: 'https://goo.gl/maps/pzdyvcbdXQ6wJyeH8',
    },
    {
      type: ContactType.Instagram,
      text: '@repnthew',
      href: 'https://www.instagram.com/repnthew/',
    },
    {
      type: ContactType.Github,
      text: 'craigpestell',
      href: 'https://github.com/craigpestell',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  { label: 'Github', Icon: GithubIcon, href: 'https://github.com/craigpestell' },
  { label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/cpestell/' },
  { label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/repnthew/' },
];
