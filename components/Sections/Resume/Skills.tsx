import 'react-circular-progressbar/dist/styles.css';

import {FC, memo, PropsWithChildren, useMemo} from 'react';
import {buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar';

import {Skill as SkillType, SkillGroup as SkillGroupType} from '../../../data/dataDef';

export const SkillGroup: FC<PropsWithChildren<{skillGroup: SkillGroupType}>> = memo(({skillGroup}) => {
  const {name, skills} = skillGroup;
  return (
    <div className="flex flex-col">
      <span className="text-center text-lg font-bold">{name}</span>
      <div className="grid grid-cols-4 gap-2">
        {skills.map((skill, index) => (
          <Skill key={`${skill.name}-${index}`} skill={skill} />
        ))}
      </div>
    </div>
  );
});

SkillGroup.displayName = 'SkillGroup';

export const Skill: FC<{skill: SkillType}> = memo(({skill}) => {
  const {name, level, max = 10, svg = ''} = skill;
  const percentage = useMemo(() => Math.round((level / max) * 100), [level, max]);
  return (
    <div className="col-span-1 flex items-center gap-x-2">
      <CircularProgressbarWithChildren
        maxValue={100}
        styles={buildStyles({
          // Text size
          textSize: '16px',
          // How long animation takes to go fr  om one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          pathColor: `#AC94FA`,

          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}
        value={percentage}>
        {svg}
        <span className="iconText">{name}</span>
      </CircularProgressbarWithChildren>
    </div>
  );
});

Skill.displayName = 'Skill';
