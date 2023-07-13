import {FC, memo} from 'react';

import {education, experience, SectionId} from '../../../data/data';
import Section from '../../Layout/Section';
import ResumeSection from './ResumeSection';
import TimelineItem from './TimelineItem';

const Resume: FC = memo(() => {
  return (
    <>
      <section id="resume"></section>
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
        </div>
      </Section>
    </>
  );
});

Resume.displayName = 'Resume';
export default Resume;
