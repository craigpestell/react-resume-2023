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

Skill.displayName = 'Skill';
