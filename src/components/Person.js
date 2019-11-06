import React from 'react';
import PropTypes from 'prop-types';
import './Person.css';

function Person({ person, selectPerson, selectedPersonId }) {
  let personClassName = `
    Person
    ${person.sex === 'm' ? 'Person--male' : 'Person--female'}
    Person--lived-in-${person.century}
  `;

  if (+selectedPersonId === person.id) {
    personClassName += '  Person--selected';
  }

  return (
    <tr className={personClassName} onClick={selectPerson} id={person.id}>
      <td>{person.id}</td>
      <td
        className={person.born < 1650
          ? 'born-before-1650'
          : 'born-from-1650'}
      >
        {person.name}
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td
        className={person.age >= 65 ? 'reached-65' : "didn't-reach-65"}
      >
        {person.age}
      </td>
      <td>{person.century}</td>
      <td>{person.mother}</td>
      <td>{person.father}</td>
    </tr>
  );
}

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    age: PropTypes.number,
    century: PropTypes.number,
    mother: PropTypes.string,
    father: PropTypes.string,
  }).isRequired,
  selectPerson: PropTypes.func.isRequired,
  selectedPersonId: PropTypes.number.isRequired,
};

export default Person;
