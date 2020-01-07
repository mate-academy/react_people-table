import React from 'react';
import PropTypes from 'prop-types';

const Person = ({ person, selectHandler, selectedPerson }) => (
  <tr
    onClick={() => selectHandler(person.id)}
    className={selectedPerson === person.id ? 'selected' : ''}
  >
    <th>{person.id}</th>
    <th className={person.born < 1650 ? 'line-through' : ''}>{person.name}</th>
    <th className={person.sex === 'm' ? 'man' : 'woman'}>{person.sex}</th>
    <th>{person.born}</th>
    <th>{person.died}</th>
    <th>{person.mother}</th>
    <th>{person.father}</th>
    <th className={person.age >= 65 ? 'green' : ''}>{person.age}</th>
    <th>{person.century}</th>
  </tr>
);

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    mother: PropTypes.string.isRequired,
    father: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    century: PropTypes.number.isRequired,
  }).isRequired,
  selectHandler: PropTypes.func.isRequired,
  selectedPerson: PropTypes.number.isRequired,
};

export default Person;
