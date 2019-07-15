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

const getClassNameOfPerson = (person) => {
  let className = 'person';

  if (person.sex === 'm') {
    className += ' person--male';
  } else {
    className += ' person--female';
  }

  if (person.sex === 'm' && person.children.length > 0) {
    className += ' person--father';
  }

  if (person.sex === 'f' && person.children.length > 0) {
    className += ' person--mother';
  }

  if ((person.died - person.born) > 65) {
    className += ' livedOver65Years';
  }

  return className;
};

const getClassNameOfCentury = ({ person }) => {
  return 'person--lived-in-${Math.ceil(person.died / 100)}';
};

const Person = ({ person, index }) => (
  <tr className={getClassNameOfPerson(person)}>
    <td>
      {index + 1}
    </td>
    <td className={getClassNameOfPersonName(person)}>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.died - person.born}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.mother}</td>
    <td>{person.father}</td>
    <td className={getClassNameOfCentury(person)}>{Math.ceil(person.died / 100)}</td>
    <td>{person.children}</td>
  </tr>
);

Person.propTypes = {
  person: PropTypes.shape({
    sex: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    mother: PropTypes.string.isRequired,
    father: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Person;
