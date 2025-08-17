'use client';

import { lazy, Suspense } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Skill, Project, Experience, Education, PersonalInfo } from '@/data/portfolio';

// Lazy load components
const LazySkills = lazy(() => import('@/components/Skills'));
const LazyProjects = lazy(() => import('@/components/Projects'));
const LazyExperience = lazy(() => import('@/components/Experience'));
const LazyContact = lazy(() => import('@/components/Contact'));
const LazyFooterControls = lazy(() => import('@/components/FooterControls'));

// Loading skeletons (same as before)
const SkillsLoader = () => (
  <section className="py-20 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="h-12 bg-muted animate-pulse rounded mx-auto mb-4 w-64"></div>
        <div className="h-6 bg-muted animate-pulse rounded mx-auto w-96"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-24 bg-muted animate-pulse rounded"></div>
        ))}
      </div>
    </div>
  </section>
);

const ProjectsLoader = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="h-12 bg-muted animate-pulse rounded mx-auto mb-4 w-80"></div>
        <div className="h-6 bg-muted animate-pulse rounded mx-auto w-96"></div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-card rounded-xl overflow-hidden">
            <div className="h-48 bg-muted animate-pulse"></div>
            <div className="p-6 space-y-4">
              <div className="h-6 bg-muted animate-pulse rounded w-3/4"></div>
              <div className="h-4 bg-muted animate-pulse rounded"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ExperienceLoader = () => (
  <section className="py-20 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="h-12 bg-muted animate-pulse rounded mx-auto mb-4 w-72"></div>
        <div className="h-6 bg-muted animate-pulse rounded mx-auto w-96"></div>
      </div>
      <div className="space-y-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg p-6">
            <div className="h-6 bg-muted animate-pulse rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-muted animate-pulse rounded"></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactLoader = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="h-12 bg-muted animate-pulse rounded mx-auto mb-4 w-64"></div>
        <div className="h-6 bg-muted animate-pulse rounded mx-auto w-80"></div>
      </div>
      <div className="max-w-lg mx-auto space-y-6">
        <div className="h-12 bg-muted animate-pulse rounded"></div>
        <div className="h-32 bg-muted animate-pulse rounded"></div>
        <div className="h-12 bg-muted animate-pulse rounded"></div>
      </div>
    </div>
  </section>
);

const FooterControlsLoader = () => (
  <div className="flex flex-wrap items-center justify-center gap-6">
    <div className="h-8 bg-muted animate-pulse rounded w-32"></div>
    <div className="h-8 bg-muted animate-pulse rounded w-24"></div>
    <div className="h-8 bg-muted animate-pulse rounded w-28"></div>
  </div>
);

// Smart lazy components that only load when visible
export const SmartSkillsSection = ({ skills }: { skills: Skill[] }) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    rootMargin: '200px', // Start loading 200px before it comes into view
  });

  return (
    <div ref={elementRef} id="skills">
      {isIntersecting ? (
        <Suspense fallback={<SkillsLoader />}>
          <LazySkills skills={skills} />
        </Suspense>
      ) : (
        <SkillsLoader />
      )}
    </div>
  );
};

export const SmartProjectsSection = ({ projects }: { projects: Project[] }) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    rootMargin: '200px',
  });

  return (
    <div ref={elementRef} id="projects">
      {isIntersecting ? (
        <Suspense fallback={<ProjectsLoader />}>
          <LazyProjects projects={projects} />
        </Suspense>
      ) : (
        <ProjectsLoader />
      )}
    </div>
  );
};

export const SmartExperienceSection = ({ 
  experience, 
  education 
}: { 
  experience: Experience[]; 
  education: Education[] 
}) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    rootMargin: '200px',
  });

  return (
    <div ref={elementRef} id="experience">
      {isIntersecting ? (
        <Suspense fallback={<ExperienceLoader />}>
          <LazyExperience experience={experience} education={education} />
        </Suspense>
      ) : (
        <ExperienceLoader />
      )}
    </div>
  );
};

export const SmartContactSection = ({ personalInfo }: { personalInfo: PersonalInfo }) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    rootMargin: '200px',
  });

  return (
    <div ref={elementRef} id="contact">
      {isIntersecting ? (
        <Suspense fallback={<ContactLoader />}>
          <LazyContact personalInfo={personalInfo} />
        </Suspense>
      ) : (
        <ContactLoader />
      )}
    </div>
  );
};

export const SmartFooterControlsSection = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    rootMargin: '100px',
  });

  return (
    <div ref={elementRef}>
      {isIntersecting ? (
        <Suspense fallback={<FooterControlsLoader />}>
          <LazyFooterControls />
        </Suspense>
      ) : (
        <FooterControlsLoader />
      )}
    </div>
  );
};
