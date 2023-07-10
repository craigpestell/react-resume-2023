import {FC, memo} from 'react';

import {education, experience, SectionId, skills} from '../../../data/data';
import Section from '../../Layout/Section';
import ResumeSection from './ResumeSection';
import {Skill} from './Skills';
import TimelineItem from './TimelineItem';

const Resume: FC = memo(() => {
  return (
    <>
      <Section sectionId={SectionId.Resume} />
      <Section className="bg-neutral-100" sectionId={SectionId.Resume}>
        <div className="flex flex-col divide-y-2 divide-neutral-300">
          <ResumeSection key="Education" title="Education">
            {education.map((item, index) => (
              <TimelineItem item={item} key={`${item.title}-${index}`} />
            ))}
          </ResumeSection>
          <ResumeSection key="Work" title="Work">
            {experience
              .filter(item => item.location !== 'Remote')
              .map((item, index) => (
                <TimelineItem item={item} key={`${item.title}-${index}`} />
              ))}
          </ResumeSection>
          <ResumeSection key="Freelance" title="Freelance">
            {experience
              .filter(item => item.location === 'Remote')
              .map(item => ({...item, location: ''}))
              .map((item, index) => (
                <TimelineItem item={item} key={`${item.title}-${index}`} />
              ))}
          </ResumeSection>
          <ResumeSection key="Skills" title="Skills">
            <div className="grid grid-cols-5 gap-6 sm:grid-cols-6">
              {skills.map((skillgroup, index) =>
                skillgroup.skills.map((skill, key) => (
                  <Skill key={`${index}-${key}`} skill={skill} />
                )),
              )}
            </div>
          </ResumeSection>
        </div>
      </Section>
    </>
  );
});

Resume.displayName = 'Resume';
export default Resume;
