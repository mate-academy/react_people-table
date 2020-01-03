import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const Person = ({ person, selectPerson }) => {
  const { personName } = useParams();

  const personSex = (person.sex === 'm')
    ? 'Person Person--male'
    : 'Person Person--female';
  const livenInCentury = `Person--lived-in-${person.century}`;
  const selected = (person.name
    .toLowerCase().split(' ').join('-') === personName)
    ? 'Person--selected'
    : '';

  return (
    <tr
      className={`${personSex} ${livenInCentury} ${selected}`}
      onClick={() => selectPerson(person.name)}
    >
      <td>{person.id}</td>
      <td className={person.born < 1650 ? 'born-before-1650' : ''}>
        {person.name}
      </td>
      <td>{person.sex.toUpperCase()}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.mother}</td>
      <td>{person.father}</td>
      <td className={person.age >= 65 ? 'lived-65' : ''}>
        {person.age}
      </td>
      <td>{person.century}</td>
    </tr>
  );
};

Person.propTypes = {
  person: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])
  ).isRequired,
  selectPerson: PropTypes.func.isRequired,
};

export default Person;
