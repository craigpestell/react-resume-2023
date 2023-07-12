import {FC, memo} from 'react';
import {buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar';

import {SectionId, skills} from '../../../data/data';
\import Section from '../../Layout/Section';
import SkillsSection from './SkillsSection';

export const Skills: FC = memo(() => {
  return (
    <Section className="bg-neutral-100" sectionId={SectionId.Skills}>
      <div className="flex flex-col divide-y-2 divide-neutral-300">
        <SkillsSection key="Freelance" title="Freelance">
          {skills.map((skillgroup, index) =>
            skillgroup.skills.map((skill, key) => <Skill key={`${index}-${key}`} skill={skill} />),
          )}
        </SkillsSection>
      </div>
    </Section>
  );
});

export const Skill: FC<{skill}> = memo(({skill}) => {
  const {name, level, max = 10, svg = ''} = skill;
  return (
    <div className="col-span-1 flex items-center gap-x-2">
      <CircularProgressbarWithChildren
        maxValue={max}
        styles={buildStyles({
          pathColor: `#4A1D96`,
        })}
        value={level}>
        {svg}
        <span className="iconText hidden sm:block">{name}</span>
      </CircularProgressbarWithChildren>
    </div>
  );
});

Skills.displayName = 'Skills';

export default Skills;
