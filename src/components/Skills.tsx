'use client';

import { motion } from 'framer-motion';
import { Skill } from '@/data/portfolio';

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const skillCategories = {
    frontend: 'Frontend',
    backend: 'Backend',
    languages: 'Languages',
    tools: 'Tools & Platforms',
    other: 'Other'
  };

  const categoryOrder = ['frontend', 'backend', 'languages', 'tools', 'other'];

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getSkillColor = (level: number) => {
    if (level >= 8) return 'bg-success';
    if (level >= 6) return 'bg-primary';
    if (level >= 4) return 'bg-warning';
    return 'bg-muted-foreground';
  };

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Technical Skills & Enterprise Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            15+ years of hands-on experience with modern technologies, enterprise platforms, and scalable solutions at Fortune 500 companies
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {categoryOrder.filter(category => groupedSkills[category]).map((category, categoryIndex) => {
            const categorySkills = groupedSkills[category];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h3 className="text-2xl font-semibold mb-6 text-foreground">
                  {skillCategories[category as keyof typeof skillCategories]}
                </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-card to-card/10 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-medium text-card-foreground">
                        {skill.name}
                      </h4>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}/10
                      </span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level * 10}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`h-3 rounded-full ${getSkillColor(skill.level)} transition-all duration-1000`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            <div className="bg-card rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-accent mb-2">
                {skills.length}
              </div>
              <div className="text-muted-foreground">
                Technologies
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-accent mb-2">
                {skills.filter(s => s.level >= 8).length}
              </div>
              <div className="text-muted-foreground">
                Expert Level
              </div>
            </div>
            
            {categoryOrder.filter(category => groupedSkills[category]).map((category) => {
              const categorySkills = groupedSkills[category];
              const avgLevel = categorySkills.reduce((acc, skill) => acc + skill.level, 0) / categorySkills.length;
              const avgProficiency = Math.round(avgLevel * 10);
              const colorClass = getSkillColor(avgLevel).replace('bg-', 'text-');
              return (
                <div key={category} className="bg-card rounded-lg p-6 shadow-md">
                  <div className={`text-3xl font-bold ${colorClass} mb-2`}>
                    {avgProficiency}%
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {skillCategories[category as keyof typeof skillCategories]}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
