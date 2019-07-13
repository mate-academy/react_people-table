import React from 'react';
import PropTypes from 'prop-types';
import './person.css';

const Person = ({ id, name, sex, born, died, age, father, mother, children }) => {
  let classMaleOrFemale = '';
  let classForName = '';
  let classGreenBorder = '';
  const century = Math.ceil(died / 100);
  const namesOfchildren = children.map(kid => kid.name);

  if (sex === 'f') {
    classMaleOrFemale = 'person--female';
    if (namesOfchildren.length !== 0) {
      classMaleOrFemale += ' person--mother';
    }
  }

  if (sex === 'm') {
    classMaleOrFemale = 'person--male';
    if (namesOfchildren.length !== 0) {
      classMaleOrFemale += ' person--father';
    }
  }

  if (born < 1650) {
    classForName = 'person--born-before-1650';
  }

  if (died > 1800) {
    classForName = 'person--died-after-1800';
  }

  if (age > 65) {
    classGreenBorder = 'person--lived-more-65y';
  }

  return (
    <tr className={`person ${classMaleOrFemale} ${classGreenBorder} person--lived-in-${century}`}>
      <td>{id + 1}</td>
      <td className={classForName}>{name}</td>
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
