'use client';

import { motion } from 'framer-motion';
import { Github, Calendar } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/data/portfolio';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const ProjectCard = ({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`bg-gradient-to-br from-card to-card/10 rounded-xl overflow-hidden shadow-lg transition-all duration-300`}
    >
      {/* Project Image */}
      <div className="relative h-48 md:h-56 bg-gradient-to-br from-muted to-secondary overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={`${project.title} - ${project.description}. Built with ${project.technologies.join(', ')}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="flex space-x-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-background/90 rounded-full transition-colors"
              >
                <Github className="w-5 h-5 text-foreground" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-card-foreground transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-3" />
            <div className="flex flex-col text-right text-primary">
              <span className="text-right text-nowrap">{formatDate(project.startDate)}</span>
              {project.endDate && <span className="text-right text-nowrap">{formatDate(project.endDate)}</span>}
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          {featured ? project.longDescription : project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex space-x-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Enterprise Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mission-critical applications built for Apple, Google, and Fortune 500 companies using React, TypeScript, and modern web technologies
          </p>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  featured={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold text-center mb-12 text-foreground"
            >
              Other Projects
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + featuredProjects.length}
                  featured={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Want to see more of my work?
          </p>
          <a
            href="https://github.com/craigpestell"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-foreground text-background px-8 py-3 rounded-lg font-medium transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>View All Projects on GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
