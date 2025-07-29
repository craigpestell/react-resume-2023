'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Download } from 'lucide-react';
import Image from 'next/image';
import { PersonalInfo } from '@/data/portfolio';
import { useEdgeABTest } from '@/hooks/useEdgeExperiment';

interface HeroProps {
  personalInfo: PersonalInfo;
  onDownloadResume?: () => void;
}

export default function Hero({ personalInfo, onDownloadResume }: HeroProps) {
  // A/B test for CTA buttons
  const { config, trackConversion, variantId } = useEdgeABTest('hero-cta-test', {
    ctaText: 'Download Resume',
    ctaStyle: 'primary' as 'primary' | 'gradient' | 'outline',
    showSecondaryButton: false,
    secondaryText: 'View Online'
  });

  // Type-safe config access
  const ctaText = (config.ctaText as string) || 'Download Resume';
  const ctaStyle = (config.ctaStyle as 'primary' | 'gradient' | 'outline') || 'primary';
  const showSecondaryButton = (config.showSecondaryButton as boolean) || false;
  const secondaryText = (config.secondaryText as string) || 'View Online';

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      trackConversion('section_navigation', { section: href, variant: variantId });
    }
  };

  const handleDownloadResume = () => {
    if (onDownloadResume) {
      onDownloadResume();
      trackConversion('resume_download', { 
        variant: variantId,
        buttonText: ctaText 
      });
    }
  };

  const handleContactClick = () => {
    scrollToSection('#contact');
    trackConversion('contact_click', { variant: variantId });
  };

  const getButtonStyles = (style: string, isPrimary = true) => {
    const baseClasses = "px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2";
    
    switch (style) {
      case 'gradient':
        return isPrimary 
          ? `${baseClasses} bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground`
          : `${baseClasses} border-2 border-primary/50 text-primary hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-primary-foreground hover:border-transparent`;
      case 'outline':
        return isPrimary
          ? `${baseClasses} border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground`
          : `${baseClasses} border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground`;
      default:
        return isPrimary
          ? `${baseClasses} bg-primary hover:bg-primary/90 text-primary-foreground`
          : `${baseClasses} border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground`;
    }
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 via-accent/5 to-background pt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
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
          </motion.div>

          {/* Name and Title */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {personalInfo.name}
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground font-light">
              {personalInfo.title}
            </h2>
          </motion.div>

          {/* Summary */}
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {personalInfo.summary}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center space-x-6 mb-8"
          >
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label={`Visit ${personalInfo.name}'s GitHub profile`}
              onClick={() => trackConversion('social_click', { platform: 'github', variant: variantId })}
            >
              <Github className="w-6 h-6 text-card-foreground" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label={`Connect with ${personalInfo.name} on LinkedIn`}
              onClick={() => trackConversion('social_click', { platform: 'linkedin', variant: variantId })}
            >
              <Linkedin className="w-6 h-6 text-card-foreground" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-3 bg-card rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label={`Send email to ${personalInfo.name}`}
              onClick={() => trackConversion('social_click', { platform: 'email', variant: variantId })}
            >
              <Mail className="w-6 h-6 text-card-foreground" />
            </a>
            <a
              href={personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label={`Visit ${personalInfo.name}'s portfolio website`}
              onClick={() => trackConversion('social_click', { platform: 'website', variant: variantId })}
            >
              <ExternalLink className="w-6 h-6 text-card-foreground" />
            </a>
          </motion.div>

          {/* CTA Buttons - A/B Tested */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Primary CTA - varies based on experiment */}
            <button
              onClick={handleDownloadResume}
              className={getButtonStyles(ctaStyle, true)}
              data-testid="primary-cta"
            >
              <Download className="w-4 h-4" />
              {ctaText}
            </button>

            {/* Secondary button or alternative action */}
            {showSecondaryButton ? (
              <button
                onClick={() => scrollToSection('#projects')}
                className={getButtonStyles(ctaStyle, false)}
                data-testid="secondary-cta"
              >
                {secondaryText}
              </button>
            ) : (
              <>
                <button
                  onClick={() => scrollToSection('#projects')}
                  className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  View My Work
                </button>
                <button
                  onClick={handleContactClick}
                  className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg font-medium transition-all duration-300"
                >
                  Get In Touch
                </button>
              </>
            )}
          </motion.div>

          {/* Experiment indicator (only in development) */}
          {process.env.NODE_ENV === 'development' && variantId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 text-xs text-muted-foreground bg-muted px-2 py-1 rounded inline-block"
            >
              Experiment: {variantId}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
