import React from 'react';

interface Props {
  people: People[];
  fatherValue: string;
  chooseFather: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errorFather: boolean;
}

export const AddFather: React.FC<Props> = ({
  people,
  fatherValue,
  chooseFather,
  errorFather,
}) => {
  const fathers = people
    .map(person => (person.sex === 'm' ? person.name : ''))
    .filter(person => person);

  return (
    <>
      <label className="add__father">
        {' '}
Choose father:
        <select value={fatherValue} onChange={e => chooseFather(e)}>
          <option value="" hidden>Choose here</option>
          {fathers.map(male => (
            <option
              value={male}
              key={male + new Date().getTime}
            >
              {male}
            </option>
          ))}
        </select>
      </label>
      {errorFather && (<span className="error__father">Choose father</span>)}
    </>
  );
};
