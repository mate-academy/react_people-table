import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

const personStyle = (person) => {
  let className = `person--lived-in-${person.century}`;

  if ((person.died - person.born) > 65) {
    className = 'people__old_65';
  } if (person.sex === 'm' && person.children.length > 0) {
    className = 'person--father';
  } if (onclick) {
    className = 'markPerson';
  }

  return className;
};

const personSex = (person) => {
  let className = `person--lived-in-${person.century}`;

  if (person.sex === 'm') {
    className = 'person--male';
  } else {
    className = 'person--female';
  }

  return className;
};

const personStyleName = (person) => {
  let className = '';

  if (person.born < 1650) {
    className = 'people__Born--Before_1650';
  }
  if (person.died > 1800) {
    className = 'people__Died--Before_1800';
  }

  return className;
};

const Person = ({ person }) => (
  <tr
    className={personStyle(person)}
  >
    <td>
      {person.id}
    </td>
    <td className={personStyleName(person)}>{person.name}</td>
    <td className={personSex(person)}>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.mother}</td>
    <td>{person.father}</td>
    <td>{person.age}</td>
    <td>{person.century}</td>
    <td>{person.children.join(', ')}</td>
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
    age: PropTypes.number.isRequired,
    century: PropTypes.number.isRequired,
    children: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Person;
