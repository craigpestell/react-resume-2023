'use client';

import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { PortfolioData } from '@/data/portfolio';
import { formatPhoneForDisplay } from '@/lib/phoneUtils';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: '#2563EB',
    paddingBottom: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#2563EB',
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    color: '#6B7280',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 5,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#374151',
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  company: {
    fontSize: 12,
    color: '#2563EB',
    marginBottom: 3,
  },
  dates: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#374151',
    marginBottom: 5,
  },
  achievements: {
    marginTop: 5,
  },
  achievement: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 2,
    paddingLeft: 10,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillItem: {
    fontSize: 10,
    backgroundColor: '#F3F4F6',
    padding: 5,
    borderRadius: 3,
    color: '#374151',
    marginBottom: 5,
  },
  projectItem: {
    marginBottom: 12,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  projectDescription: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 3,
  },
  technologies: {
    fontSize: 9,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  institution: {
    fontSize: 11,
    color: '#2563EB',
  },
  educationDates: {
    fontSize: 10,
    color: '#6B7280',
  },
});

// PDF Document Component
const ResumeDocument = ({ data }: { data: PortfolioData }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          <View style={styles.contactInfo}>
            <Text>{data.personalInfo.email}</Text>
            <Text>{formatPhoneForDisplay(data.personalInfo.phone)}</Text>
            <Text>{data.personalInfo.location}</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{data.personalInfo.summary}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{exp.position}</Text>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.dates}>
                {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
              </Text>
              <Text style={styles.description}>{exp.description}</Text>
              {exp.achievements.length > 0 && (
                <View style={styles.achievements}>
                  {exp.achievements.map((achievement, index) => (
                    <Text key={index} style={styles.achievement}>
                      • {achievement}
                    </Text>
                  ))}
                </View>
              )}
              {exp.technologies.length > 0 && (
                <Text style={styles.technologies}>
                  Technologies: {exp.technologies.join(', ')}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillsGrid}>
            {data.skills.map((skill) => (
              <Text key={skill.name} style={styles.skillItem}>
                {skill.name}
              </Text>
            ))}
          </View>
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Projects</Text>
          {data.projects.filter(p => p.featured).map((project) => (
            <View key={project.id} style={styles.projectItem}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectDescription}>{project.description}</Text>
              <Text style={styles.technologies}>
                Technologies: {project.technologies.join(', ')}
              </Text>
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={styles.educationItem}>
              <Text style={styles.degree}>{edu.degree} in {edu.field}</Text>
              <Text style={styles.institution}>{edu.institution}</Text>
              <Text style={styles.educationDates}>
                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                {edu.gpa && ` | GPA: ${edu.gpa}`}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

// Function to generate and download PDF
export const generateResume = async (data: PortfolioData) => {
  try {
    const blob = await pdf(<ResumeDocument data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('There was an error generating the resume. Please try again.');
  }
};

export default ResumeDocument;
