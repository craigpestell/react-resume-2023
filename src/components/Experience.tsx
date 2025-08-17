'use client';

import { motion } from 'framer-motion';
import { Calendar, Building, ChevronDown, ChevronRight } from 'lucide-react';
import { Experience, Education } from '@/data/portfolio';
import { useState } from 'react';

interface ExperienceProps {
  experience: Experience[];
  education: Education[];
}

export default function ExperienceSection({ experience, education }: ExperienceProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  };

  const ExperienceCard = ({ exp, index }: { exp: Experience; index: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="h-full"
      >
        <div className="bg-gradient-to-br from-card to-card/10 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow h-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-card-foreground mb-1">
                {exp.position}
              </h3>
              <div className="flex items-center text-primary mb-2">
                <Building className="w-4 h-4 mr-2" />
                <span className="font-medium">{exp.company}</span>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center mb-1">
                <Calendar className="w-4 h-4 mr-3" />
                <div className="flex flex-col text-primary">
                  <span className="text-right text-nowrap">{formatDate(exp.startDate)}</span>
                  <span className="text-right text-nowrap">{exp.endDate ? formatDate(exp.endDate) : 'Present'}</span>
                </div>
              </div>
              <span className="text-xs bg-muted px-2 py-1 rounded block text-center">
                {calculateDuration(exp.startDate, exp.endDate)}
              </span>
            </div>
          </div>

          <p className="text-muted-foreground mb-4">
            {exp.description}
          </p>

          {/* Achievements */}
          {exp.achievements.length > 0 && (
            <div className="mb-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center text-sm font-medium text-card-foreground hover:text-primary transition-colors mb-2"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 mr-1" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-1" />
                )}
                Key Achievements ({exp.achievements.length})
              </button>
              
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ul className="mx-4 list-disc list-outside space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-muted-foreground text-sm">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  const EducationCard = ({ edu, index }: { edu: Education; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <div className="bg-gradient-to-br from-card to-card/10 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1">
              {edu.degree}
            </h3>
            <p className="text-primary font-medium mb-1">
              {edu.field}
            </p>
            <div className="flex items-center text-muted-foreground mb-2">
              <Building className="w-4 h-4 mr-2" />
              <span>{edu.institution}</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Calendar className="w-4 h-4 mr-3" />
              <div className="flex flex-col text-right text-primary">
                <span className="text-right text-nowrap">{formatDate(edu.startDate)}</span>
                <span className="text-right text-nowrap">{formatDate(edu.endDate)}</span>
              </div>
            </div>
            {edu.gpa && (
              <div className="text-sm text-muted-foreground text-center">
                GPA: {edu.gpa}
              </div>
            )}
          </div>
        </div>

        {edu.achievements && edu.achievements.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              Achievements:
            </h4>
            <ul className="mx-4 list-disc list-outside space-y-1">
              {edu.achievements.map((achievement, i) => (
                <li key={i} className="text-muted-foreground text-sm">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
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
            Experience & Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey and educational background
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Experience Section */}
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-8 text-foreground"
            >
              Professional Experience
            </motion.h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  <ExperienceCard exp={exp} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-8 text-foreground"
            >
              Education
            </motion.h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {education.map((edu, index) => (
                <EducationCard key={edu.id} edu={edu} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
