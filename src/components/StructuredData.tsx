'use client';

import { PersonalInfo } from '@/data/portfolio';
import { obfuscatePhoneNumber } from '@/lib/phoneUtils';

interface StructuredDataProps {
  personalInfo: PersonalInfo;
}

export default function StructuredData({ personalInfo }: StructuredDataProps) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personalInfo.name,
    "jobTitle": personalInfo.title,
    "description": personalInfo.summary,
    "url": personalInfo.website,
    "email": personalInfo.email,
    "telephone": obfuscatePhoneNumber(personalInfo.phone),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": personalInfo.location
    },
    "sameAs": [
      personalInfo.linkedin,
      personalInfo.github,
      personalInfo.website
    ],
    "knowsAbout": [
      "React",
      "TypeScript", 
      "JavaScript",
      "Node.js",
      "Next.js",
      "Vue.js",
      "Angular",
      "Python",
      "TailwindCSS",
      "Software Engineering",
      "Enterprise Applications",
      "Full Stack Development",
      "Frontend Architecture",
      "Backend Development"
    ],
    "alumniOf": personalInfo.location,
    "worksFor": [
      {
        "@type": "Organization",
        "name": "Apple"
      },
      {
        "@type": "Organization", 
        "name": "Google"
      },
      {
        "@type": "Organization",
        "name": "Williams Sonoma"
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Craig Pestell Portfolio",
    "description": "Senior Software Engineer portfolio showcasing enterprise applications and technical expertise",
    "url": personalInfo.website,
    "author": {
      "@type": "Person",
      "name": personalInfo.name
    },
    "inLanguage": "en-US"
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `${personalInfo.name} - Software Engineering Services`,
    "description": "Senior Software Engineer providing enterprise application development, React consulting, and full-stack development services",
    "provider": {
      "@type": "Person",
      "name": personalInfo.name,
      "jobTitle": personalInfo.title
    },
    "serviceType": [
      "Software Development",
      "React Development", 
      "TypeScript Development",
      "Enterprise Applications",
      "Full Stack Development",
      "Technical Consulting"
    ],
    "areaServed": "Worldwide"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": personalInfo.website
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": `${personalInfo.website}#about`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Skills",
        "item": `${personalInfo.website}#skills`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Projects",
        "item": `${personalInfo.website}#projects`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Experience",
        "item": `${personalInfo.website}#experience`
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Contact",
        "item": `${personalInfo.website}#contact`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  );
}
