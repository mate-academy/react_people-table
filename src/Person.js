import React from 'react';
import PropTypes from 'prop-types';

const Person = ({ person, index, handler, selected }) => {
  const active = selected ? 'person--selected' : '';
  const rowClass = person.sex === 'f'
    ? 'person person--female'
    : 'person person--male';
  const rowClasses = `${active} + ${rowClass}`;
  const bornBefore1650 = person.born < 1650
    ? 'born_before_1650'
    : '';
  const ageMore65 = (person.age) >= 65
    ? 'age_more_65'
    : '';

  return (
    <tr
      className={rowClasses}
      onClick={() => handler(index)}
    >
      <td>{person.id}</td>
      <td className={bornBefore1650}>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td className={ageMore65}>{person.age}</td>
      <td>{person.century}</td>
      <td>{person.mother}</td>
      <td>{person.father}</td>
    </tr>
  );
};

Person.propTypes = {
  person: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handler: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default Person;
