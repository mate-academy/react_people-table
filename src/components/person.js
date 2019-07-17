import React from 'react';
import PropTypes from 'prop-types';

const getClassNameOfPersonName = (person) => {
  let className = '';
  if (person.born < 1650) {
    className = 'bornBefore1650';
  }

  if (person.died > 1800) {
    className = 'diedAfter1800';
  }
  return className;
};

const Person = ({ person, getSelect, getClassNameOfPerson }) => (
  <tr
    key={person.id}
    className={getClassNameOfPerson(person)}
    onClick={() => getSelect(person.id)}
  >
    <td>{person.id}</td>
    <td className={getClassNameOfPersonName(person)}>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.age}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.mother}</td>
    <td>{person.father}</td>
    <td className={`person--lived-in-${person.century}`}>{person.century}</td>
    <td>{person.children}</td>
  </tr>
);

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sex: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
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
