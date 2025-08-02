'use client';

import Header from '@/components/Header';
import Hero from '@/components/HeroWithTesting';
import StructuredData from '@/components/StructuredData';
import { 
  SmartSkillsSection,
  SmartProjectsSection,
  SmartExperienceSection,
  SmartContactSection,
  SmartFooterControlsSection
} from '@/components/SmartLazyComponents';
import { portfolioData } from '@/data/portfolio';
import { generateResume } from '@/components/ResumeGenerator';

export default function Home() {
  const handleDownloadResume = () => {
    generateResume(portfolioData);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <StructuredData personalInfo={portfolioData.personalInfo} />
      <Header onDownloadResume={handleDownloadResume} />
      <Hero personalInfo={portfolioData.personalInfo} onDownloadResume={handleDownloadResume} />
      <SmartSkillsSection skills={portfolioData.skills} />
      <SmartProjectsSection projects={portfolioData.projects} />
      <SmartExperienceSection 
        experience={portfolioData.experience} 
        education={portfolioData.education} 
      />
      
      <SmartContactSection personalInfo={portfolioData.personalInfo} />
      
      {/* Footer */}
      <footer className="bg-card text-card-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-center md:text-left">
              © 2025 {portfolioData.personalInfo.name}. Built with Next.js and TailwindCSS.
            </p>
            <SmartFooterControlsSection />
          </div>
        </div>
      </footer>
    </main>
  );
}
