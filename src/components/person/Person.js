import React from 'react';
import PropTypes from 'prop-types';
import './person.css';

const Person = ({ id, name, sex, born, died, age, father, mother, children }) => {
  const century = Math.ceil(died / 100);
  const namesOfchildren = children.map(kid => kid.name);
  const stylesForPersonName = {};
  const classesForPerson = ['person', `person--lived-in-${century}`];

  if (sex === 'f') {
    classesForPerson.push('person--female');
    if (namesOfchildren.length !== 0) {
      classesForPerson.push(' person--mother');
    }
  }

  if (sex === 'm') {
    classesForPerson.push('person--male');
    if (namesOfchildren.length !== 0) {
      classesForPerson.push(' person--father');
    }
  }

  if (age > 65) {
    classesForPerson.push('person--lived-more-65y');
  }

  if (born < 1650) {
    stylesForPersonName.textDecoration = 'line-through';
  }

  if (died > 1800) {
    stylesForPersonName.fontWeight = 'bold';
  }

  return (
    <tr className={classesForPerson.join(' ')}>
      <td>{id + 1}</td>
      <td style={stylesForPersonName}>{name}</td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{age}</td>
      <td>{mother}</td>
      <td>{father}</td>
      <td>{century}</td>
      <td>{namesOfchildren.join(', ')}</td>
    </tr>
  );
};

Person.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  sex: PropTypes.string,
  born: PropTypes.number.isRequired,
  died: PropTypes.number.isRequired,
  age: PropTypes.number.isRequired,
  father: PropTypes.string,
  mother: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.string),
};

Person.defaultProps = {
  sex: '',
  father: '',
  mother: '',
  children: [],
};

export default Person;
