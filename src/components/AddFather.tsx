import React from 'react';

interface Props {
  bornValue: string;
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
  bornValue
}) => {
  const fathers = people
    .map(person => (person.sex === 'm'
      && person.born as number < +bornValue
      && person.died as number > +bornValue
      ? person.name
      : ''))
    .filter(person => person);

  return (
    <>
      <label className="add__father">
        {' '}
Choose father:
        <select value={fatherValue} onChange={e => chooseFather(e)}>
          <option value="" hidden>{bornValue ? 'Choose here' : 'Write birth year'}</option>
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
