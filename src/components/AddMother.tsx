import React from 'react';

interface Props {
  people: People[];
  fatherValue: string;
  chooseMother: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errorMother: boolean;
  bornValue: string;

}

export const AddMother: React.FC<Props> = ({
  people,
  fatherValue,
  chooseMother,
  errorMother,
  bornValue,
}) => {
  const mother = people
    .map(person => (person.sex === 'f'
      && person.born as number < +bornValue
      && person.died as number > +bornValue
      ? person.name
      : ''))
    .filter(person => person);

  return (
    <>
      <label className="add__mother">
        {' '}
Choose mother:
        <select value={fatherValue} onChange={e => chooseMother(e)}>
          <option value="" hidden>{bornValue ? 'Choose here' : 'Write birth year'}</option>

          {mother.map(female => (
            <option
              value={female}
              key={female + new Date().getTime}
            >
              {female}
            </option>
          ))}
        </select>
      </label>
      {errorMother && (<span className="error__mother">Choose mother</span>)}
    </>
  );
};
