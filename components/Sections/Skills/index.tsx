import 'react-circular-progressbar/dist/styles.css';

import {FC, memo} from 'react';
import {buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar';

import {SectionId, skills} from '../../../data/data';
import {Skill} from '../../../data/dataDef';
import Section from '../../Layout/Section';

export const Skills: FC = memo(() => {
  const title = 'Skills';
  return (
    <Section className="bg-neutral-100" sectionId={SectionId.Skills}>
      <div className="flex flex-col divide-y-2 divide-neutral-300">
        <div className="grid grid-cols-1 gap-y-4 py-8 first:pt-0 last:pb-0  md:grid-cols-4">
          <div className="col-span-1 flex justify-center md:justify-start">
            <div className="relative h-max">
              <h2 className="text-xl font-bold uppercase text-neutral-800">{title}</h2>
              <span className="absolute inset-x-0 -bottom-1 border-b-2 border-purple-500" />
            </div>
          </div>
          <div class="col-span-1 flex flex-col md:col-span-3">
            <div className="grid grid-cols-5 gap-6 sm:grid-cols-6">
              {skills.map((skillgroup, index) =>
                skillgroup.skills.map((skill, key) => <Skill key={`${index}-${key}`} skill={skill} />),
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

const Skill: FC<{skill: Skill}> = memo(({skill}) => {
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
