import React from 'react';
import PropTypes from 'prop-types';

const getPersonStyle = (person) => {
  let className = `person--lived-in-${person.century}`;

  if (person.sex === 'f') {
    className += ` person--female`;
  }

  if (person.sex === 'm') {
    className += ` person--male`;
  }

  if (person.age > 65) {
    className += ` person--age`;
  }

  return className;
};

const getNameStyle = (person) => {
  let className = '';

  if (person.born < 1650) {
    className += ' person--born';
  }

  if (person.died > 1800) {
    className += ' person--died';
  }

  return className;
};

const Person = ({ person, index }) => (

  <tr className={getPersonStyle(person)}>
    <td>{index}</td>
    <td className={getNameStyle(person)}>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.age}</td>
    <td>{person.century}</td>
    <td>{person.mother}</td>
    <td>{person.father}</td>
    <td>{person.children.join(', ')}</td>
  </tr>
);

Person.propTypes = {
  index: PropTypes.number.isRequired,
  person: PropTypes.shape({
    index: PropTypes.number,
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    age: PropTypes.number,
    century: PropTypes.number,
    mother: PropTypes.string,
    father: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Person;
