'use client';

import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { PersonalInfo } from '@/data/portfolio';

interface HeroProps {
  personalInfo: PersonalInfo;
}

export default function Hero({ personalInfo }: HeroProps) {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 via-accent/5 to-background pt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-primary to-accent p-1">
              {personalInfo.profileImage ? (
                <Image 
                  src={personalInfo.profileImage} 
                  alt={`${personalInfo.name} - ${personalInfo.title} | Professional headshot of senior software engineer with experience at Apple, Google, and Williams Sonoma`}
                  width={192}
                  height={192}
                  className="w-full h-full rounded-full object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full rounded-full bg-muted flex items-center justify-center text-4xl font-bold text-muted-foreground">
                  {personalInfo.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
          </div>

          {/* Name and Title */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {personalInfo.name}
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground font-light">
              {personalInfo.title}
            </h2>
          </div>

          {/* Summary */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {personalInfo.summary}
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label={`Visit ${personalInfo.name}'s GitHub profile`}
            >
              <Github className="w-6 h-6 text-card-foreground" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label={`Connect with ${personalInfo.name} on LinkedIn`}
            >
              <Linkedin className="w-6 h-6 text-card-foreground" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-3 bg-card rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label={`Send email to ${personalInfo.name}`}
            >
              <Mail className="w-6 h-6 text-card-foreground" />
            </a>
            <a
              href={personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label={`Visit ${personalInfo.name}'s portfolio website`}
            >
              <ExternalLink className="w-6 h-6 text-card-foreground" />
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('#projects')}
              className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg font-medium transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
