'use client';

import Header from '@/components/Header';
import Hero from '@/components/HeroWithTesting';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import StructuredData from '@/components/StructuredData';
import FontSelector from '@/components/FontSelector';
import LetterSpacingSelector from '@/components/LetterSpacingSelector';
import ThemeChooser from '@/components/ThemeChooser';
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
      <Skills skills={portfolioData.skills} />
      <Projects projects={portfolioData.projects} />
      <Experience 
        experience={portfolioData.experience} 
        education={portfolioData.education} 
      />
      
      <Contact personalInfo={portfolioData.personalInfo} />
      
      {/* Footer */}
      <footer className="bg-card text-card-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-center md:text-left">
              © 2025 {portfolioData.personalInfo.name}. Built with Next.js and TailwindCSS.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <ThemeChooser 
                showLabels={true}
                spacing="sm"
                darkToggleVariant="ghost"
                darkToggleSize="sm"
              />
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Font:</span>
                <FontSelector />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Spacing:</span>
                <LetterSpacingSelector />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
