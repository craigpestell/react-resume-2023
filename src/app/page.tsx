'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import { portfolioData } from '@/data/portfolio';
import { generateResume } from '@/components/ResumeGenerator';

export default function Home() {
  const handleDownloadResume = () => {
    generateResume(portfolioData);
  };

  return (
    <main className="min-h-screen">
      <Header onDownloadResume={handleDownloadResume} />
      <Hero personalInfo={portfolioData.personalInfo} />
      <Skills skills={portfolioData.skills} />
      <Projects projects={portfolioData.projects} />
      <Experience 
        experience={portfolioData.experience} 
        education={portfolioData.education} 
      />
      <Contact personalInfo={portfolioData.personalInfo} />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 {portfolioData.personalInfo.name}. Built with Next.js and TailwindCSS.
          </p>
        </div>
      </footer>
    </main>
  );
}
