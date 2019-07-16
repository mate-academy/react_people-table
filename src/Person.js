import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

function Person({ person, selectedPerson, handleSelect }) {
  return (
    <tr
      onClick={() => handleSelect(person.id)}
      className={`
          ${selectedPerson === person.id ? 'person-selected' : ''}
          person person--lived-in-${person.century}
          ${person.sex === 'f' ? 'person--female' : 'person--male'}
          ${person.age > 65 && 'person-age__more65'}
          ${person.sex === 'm' && person.children.length > 0
      ? 'person-father' : ''}
        `}
y
    >
      <td>{person.id}</td>
      <td className={`
        ${person.born <= 1650 && 'person-died__line-style'}
        ${person.died > 1800 && 'person-died__bold'}
       `}
      >
        {person.name}
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.age}</td>
      <td>{person.century}</td>
      <td>{person.mother}</td>
      <td>{person.father}</td>
      <td>{person.children.map(child => child.name).join(', ')}</td>
    </tr>
  );
}

Person.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  selectedPerson: PropTypes.number.isRequired,
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    century: PropTypes.number.isRequired,
    mother: PropTypes.string.isRequired,
    father: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
  }).isRequired,
};

export default Person;
