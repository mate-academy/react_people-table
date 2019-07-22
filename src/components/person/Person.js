import React from 'react';
import PropTypes from 'prop-types';
import './person.css';

const Person = ({ person, onClickRow, selectPerson }) => {
  const {
    id, name, sex, born, died, age, father, mother, children, century,
  } = person;
  const stylesForPersonName = {};
  const classesForPerson = ['person', `person--lived-in-${century}`];

  if (sex === 'f') {
    classesForPerson.push('person--female');
    if (children.length !== 0) {
      classesForPerson.push(' person--mother');
    }
  }

  if (sex === 'm') {
    classesForPerson.push('person--male');
    if (children.length !== 0) {
      classesForPerson.push(' person--father');
    }
  }

  if (age > 65) {
    classesForPerson.push('person--lived-more-65y');
  }

  if (id === selectPerson) {
    classesForPerson.push('person--select');
  }

  if (born < 1650) {
    stylesForPersonName.textDecoration = 'line-through';
  }

  if (died > 1800) {
    stylesForPersonName.fontWeight = 'bold';
  }

  return (
    <tr className={classesForPerson.join(' ')} onClick={() => onClickRow(id)}>
      <td>{id + 1}</td>
      <td style={stylesForPersonName}>{name}</td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{age}</td>
      <td>{mother}</td>
      <td>{father}</td>
      <td>{century}</td>
      <td>{children.join(', ')}</td>
    </tr>
  );
};

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sex: PropTypes.string,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    father: PropTypes.string,
    mother: PropTypes.string,
    century: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onClickRow: PropTypes.func.isRequired,
  selectPerson: PropTypes.number,
};

Person.defaultProps = {
  selectPerson: '',
};

export default Person;
