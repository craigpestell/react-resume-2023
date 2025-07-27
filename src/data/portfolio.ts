export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  profileImage?: string;
  summary: string;
}

export interface Skill {
  name: string;
  level: number; // 1-10
  category: 'frontend' | 'backend' | 'tools' | 'languages' | 'other';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  projectUrl?: string;
  githubUrl?: string;
  startDate: string;
  endDate?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Craig Pestell",
    title: "Senior Software Engineer",
    email: "craigpestell@gmail.com",
    phone: "+1 (415) 513-7188",
    location: "Vancouver, BC, Canada",
    website: "https://craigpestell.com",
    github: "https://github.com/craigpestell",
    linkedin: "https://linkedin.com/in/craigpestell",
    profileImage: "/images/profilepic.jpg",
    summary: "Senior Software Engineer with 15+ years of experience architecting and delivering mission-critical enterprise applications for industry leaders including Apple, Google, Macy's, and Williams Sonoma. Proven expertise in full-stack development, micro-frontend architecture, and AI platform integration. Currently leading development of enterprise hardware testing solutions at Apple while maintaining a track record of transforming complex technical challenges into scalable, user-centric products that drive measurable business value."
  },
  skills: [
    { name: "React", level: 9, category: "frontend" },
    { name: "TypeScript", level: 9, category: "languages" },
    { name: "JavaScript", level: 10, category: "languages" },
    { name: "Next.js", level: 9, category: "frontend" },
    { name: "Vue.js", level: 8, category: "frontend" },
    { name: "Angular", level: 8, category: "frontend" },
    { name: "Node.js", level: 9, category: "backend" },
    { name: "Python", level: 8, category: "languages" },
    { name: "TailwindCSS", level: 9, category: "frontend" },
    { name: "SASS/SCSS", level: 9, category: "frontend" },
    { name: "PostgreSQL", level: 8, category: "backend" },
    { name: "MongoDB", level: 7, category: "backend" },
    { name: "Express.js", level: 9, category: "backend" },
    { name: "NestJS", level: 8, category: "backend" },
    { name: "Webpack", level: 8, category: "tools" },
    { name: "Git", level: 10, category: "tools" },
    { name: "Linux", level: 9, category: "tools" },
    { name: "AWS", level: 7, category: "tools" },
    { name: "Azure", level: 7, category: "tools" },
    { name: "Google Cloud", level: 7, category: "tools" },
    { name: "Docker", level: 8, category: "tools" },
    { name: "Kubernetes", level: 7, category: "tools" },
    { name: "Auth0", level: 8, category: "tools" },
    { name: "GraphQL", level: 7, category: "backend" },
    { name: "Redux", level: 8, category: "frontend" }
  ],
  projects: [
    {
      id: "project-1",
      title: "Enterprise Hardware Testing Platform",
      description: "Mission-critical application supporting embedded software engineers in hardware test data collection and analysis",
      longDescription: "Leading development of a comprehensive enterprise platform at Apple that enables embedded software engineers to efficiently collect, filter, and analyze hardware test results. The solution streamlines critical testing workflows and provides actionable insights for hardware development teams across multiple product lines.",
      technologies: ["TypeScript", "Next.js", "React", "Python"],
      imageUrl: "/images/portfolio-1.jpg",
      startDate: "2024-08",
      featured: true
    },
    {
      id: "project-2", 
      title: "AI-Powered Healthcare Platform",
      description: "Enterprise healthcare solution leveraging LLMs with integrated subscription management and Chrome extension",
      longDescription: "Architected and delivered a sophisticated healthcare platform leveraging AI large language models to reduce operational costs and deliver measurable value to enterprise customers. Developed comprehensive web dashboard for subscription management, Chrome extension for seamless website integration, and implemented enterprise-grade Auth0 authentication across all platform components.",
      technologies: ["TypeScript", "Next.js", "NestJS", "Python", "Azure", "Auth0"],
      imageUrl: "/images/portfolio-2.jpg",
      projectUrl: "https://example-healthcare.com",
      startDate: "2023-07",
      endDate: "2024-05",
      featured: true
    },
    {
      id: "project-3",
      title: "Silicon Design Collaboration Platform",
      description: "Version control and collaboration system for silicon chip specifications across 20+ engineering teams",
      longDescription: "Designed and prototyped Fuse Manager, an innovative version control system for silicon chip design specifications at Google. Created comprehensive proof-of-concepts and wireframes that guided architectural decisions for a platform enabling seamless collaboration across 20+ hardware engineering teams. Successfully transitioned prototypes to production-ready application using Angular and Google's internal toolchain.",
      technologies: ["Angular", "TypeScript", "Python", "RxJS"],
      imageUrl: "/images/portfolio-3.jpg",
      startDate: "2022-02",
      endDate: "2023-10",
      featured: true
    },
    {
      id: "project-4",
      title: "Enterprise Micro-Frontend Architecture",
      description: "Large-scale architectural transformation from monolithic e-commerce platform to modular micro-frontend ecosystem",
      longDescription: "Spearheaded the architectural transformation of Williams Sonoma's legacy monolithic e-commerce platform into a modern, scalable micro-frontend ecosystem. Designed and implemented reusable component architecture enabling independent team deployment cycles, significantly improving developer velocity and end-user experience through enhanced performance and maintainability.",
      technologies: ["Vue.js", "Node.js", "TailwindCSS", "SASS", "Jest", "Yeoman"],
      imageUrl: "/images/portfolio-4.jpg",
      startDate: "2020-10",
      endDate: "2021-12",
      featured: false
    },
    {
      id: "project-5",
      title: "High-Performance E-commerce Platform",
      description: "Scalable micro-frontend architecture with advanced performance optimization for enterprise e-commerce",
      longDescription: "Architected and implemented a componentized, loosely coupled, isomorphic micro-frontend platform for Macy's e-commerce operations. Delivered comprehensive performance optimization across REST services and Node.js applications on Google Cloud Platform. Integrated enterprise analytics solutions including Adobe Analytics, Google Analytics, and Tealium for comprehensive customer insights.",
      technologies: ["React", "Redux", "GraphQL", "Node.js", "Webpack", "Foundation"],
      imageUrl: "/images/portfolio-5.jpg",
      startDate: "2015-02",
      endDate: "2020-04",
      featured: false
    },
    {
      id: "project-6",
      title: "Custom E-commerce Platform & CMS",
      description: "End-to-end development of responsive product catalog with integrated content management system",
      longDescription: "Independently designed and developed a comprehensive e-commerce platform for Kali Protectives, delivering a fully responsive product catalog with custom content management capabilities. Implemented Node.js REST API architecture, integrated Cloudinary for optimized image delivery, and established complete DevOps pipeline across development, staging, and production environments.",
      technologies: ["Node.js", "Express", "PostgreSQL", "Handlebars", "TinyMCE"],
      imageUrl: "/images/kali-interceptor.jpg",
      projectUrl: "https://kaliprotectives.com",
      startDate: "2016-01",
      endDate: "2019-10",
      featured: false
    },
    {
      id: "project-7",
      title: "Travel Insurance Platform",
      description: "Comprehensive travel insurance web portal for domestic and international policies",
      longDescription: "Developed multiple intranet applications and public websites for TIC/The Cooperators travel insurance. Created online claims submission forms, customer portals, and integrated web services for policy management and customer service operations.",
      technologies: ["PHP", "MySQL", "JavaScript"],
      imageUrl: "/images/cooperators.png",
      projectUrl: "https://travelinsurance.ca",
      startDate: "2006-05",
      endDate: "2013-09",
      featured: false
    },
    {
      id: "project-8",
      title: "Hayes Bicycle Group Website",
      description: "Product catalog and marketing website for bicycle component manufacturer",
      longDescription: "Collaborated with marketing team to build a comprehensive website featuring product catalog, blog posts, and hierarchical page structure. Implemented PHP/MySQL backend for dynamic content delivery and integrated Cloudinary for optimized image management.",
      technologies: ["PHP", "MySQL", "WordPress", "JavaScript"],
      imageUrl: "/images/hayes-homepage.png",
      startDate: "2009-01",
      endDate: "2009-12",
      featured: false
    },
    {
      id: "project-9",
      title: "Race Face Performance Products",
      description: "E-commerce platform for mountain bike component manufacturer",
      longDescription: "Designed and developed comprehensive e-commerce solution for Race Face, including public product catalogs, distributor portals, and email marketing campaigns. Managed complete Linux server infrastructure across multiple environments.",
      technologies: ["PHP", "MySQL", "WordPress", "JavaScript"],
      imageUrl: "/images/raceface-home-bars.png",
      projectUrl: "https://raceface.com",
      startDate: "2008-09",
      endDate: "2016-03",
      featured: false
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "Apple Inc.",
      position: "Senior Full Stack Developer",
      startDate: "2024-08",
      description: "Developing enterprise applications to optimize embedded software engineering workflows and hardware testing processes",
      achievements: [
        "Architecting TypeScript/Next.js platform serving critical hardware testing workflows",
        "Collaborating with cross-functional embedded software engineering teams",
        "Implementing scalable Python backend services for complex test data processing and analysis"
      ],
      technologies: ["TypeScript", "Next.js", "React", "Python", "Docker", "Kubernetes"]
    },
    {
      id: "exp-2",
      company: "Healthcare Technology Startup",
      position: "Senior Full Stack Developer",
      startDate: "2023-07",
      endDate: "2024-05",
      description: "Led development of AI-powered healthcare platform designed to reduce operational costs and deliver measurable value to enterprise customers",
      achievements: [
        "Architected and delivered customer subscription management dashboard from concept to production",
        "Developed Chrome extension enabling seamless website augmentation through intelligent script injection",
        "Implemented enterprise-grade Auth0 authentication and authorization across distributed application ecosystem",
        "Established standardized Azure deployment pipelines ensuring consistent application hosting procedures",
        "Created comprehensive Tailwind component library enabling consistent brand experience across platforms"
      ],
      technologies: ["TypeScript", "Next.js", "NestJS", "Python", "Azure", "Auth0"]
    },
    {
      id: "exp-3",
      company: "Google Inc.",
      position: "Senior UI Developer",
      startDate: "2022-02",
      endDate: "2023-10",
      description: "Designed and developed innovative collaboration platform for silicon chip design specifications across 20+ engineering teams",
      achievements: [
        "Created comprehensive proof-of-concepts and technical wireframes for Fuse Manager application",
        "Delivered production-ready features using Angular, RxJS, and Google's internal development ecosystem",
        "Conducted thorough code reviews ensuring high-quality standards across frontend development team",
        "Provided technical leadership for architectural decisions in chip design collaboration platform"
      ],
      technologies: ["Angular", "TypeScript", "Python", "RxJS"]
    },
    {
      id: "exp-4",
      company: "Williams Sonoma",
      position: "Senior UI Developer",
      startDate: "2020-10",
      endDate: "2021-12",
      description: "Led architectural transformation of legacy monolithic e-commerce platform to modern micro-frontend ecosystem",
      achievements: [
        "Delivered significant performance improvements enhancing end-user experience across all customer touchpoints",
        "Streamlined developer experience and accelerated feature delivery lifecycle through modern tooling",
        "Architected and implemented micro-frontend component build system with structured CI/CD pipeline",
        "Successfully migrated complex legacy monolithic architecture to scalable, maintainable modern platform"
      ],
      technologies: ["Vue.js", "Node.js", "TailwindCSS", "SASS", "Jest"]
    },
    {
      id: "exp-5",
      company: "Macy's",
      position: "Senior UI Developer",
      startDate: "2015-02",
      endDate: "2020-04",
      description: "Architected enterprise-scale micro-frontend platform and led comprehensive performance optimization initiatives",
      achievements: [
        "Designed componentized, loosely coupled, scalable isomorphic micro-frontend architecture serving millions of users",
        "Optimized REST services and Node.js applications on Google Cloud Platform achieving significant performance gains",
        "Integrated comprehensive analytics ecosystem including Adobe Analytics, Google Analytics, and Tealium",
        "Mentored development teams on advanced frontend and backend development practices",
        "Created developer tooling and frameworks streamlining onboarding and accelerating feature development"
      ],
      technologies: ["React", "Redux", "GraphQL", "Node.js", "Webpack", "SASS"]
    },
    {
      id: "exp-6",
      company: "Kali Protectives",
      position: "Lead Full Stack Developer",
      startDate: "2016-01",
      endDate: "2019-10",
      description: "Independently delivered comprehensive e-commerce platform and brand digital presence for sports equipment manufacturer",
      achievements: [
        "Collaborated with marketing team to establish compelling brand identity and comprehensive style guide",
        "Architected and implemented robust Node.js REST API providing scalable data endpoints",
        "Integrated Cloudinary for advanced image optimization delivering superior responsive web performance",
        "Established complete DevOps infrastructure across development, staging, and production environments",
        "Designed and delivered targeted HTML email marketing campaigns driving customer engagement"
      ],
      technologies: ["Node.js", "Express", "PostgreSQL", "Handlebars", "TinyMCE"]
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "British Columbia Institute of Technology",
      degree: "Diploma in Computer Systems Technology",
      field: "Data Communications & Networking",
      startDate: "2004-01",
      endDate: "2006-12",
      achievements: [
        "Specialized in Internet infrastructure and network architecture",
        "Comprehensive curriculum covering enterprise data communications and network security"
      ]
    },
    {
      id: "edu-2",
      institution: "British Columbia Institute of Technology", 
      degree: "Certificate in Programming",
      field: "Programming Concepts and Methodologies",
      startDate: "1999-01",
      endDate: "1999-12",
      achievements: [
        "Foundational training in software development principles and best practices",
        "Early specialization in object-oriented programming and system design methodologies"
      ]
    }
  ]
};
