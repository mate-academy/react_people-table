import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

const classNames = require('classnames');

const Person = ({ person, selectedPerson, markByClick }) => {
  const rowClassName = classNames({
    person,
    'person--male': person.sex === 'm',
    'person--female': person.sex === 'f',
    'person--lived-more-than-65-years': person.age > 65,
    'person--father': person.sex === 'm' && person.children,
    'person--mother': person.sex === 'f' && person.children,
    [`person--lived-in-${person.century}`]: true,
    'person--selected': selectedPerson === person.id,
  });

  const columnClassName = classNames({
    'person--born-before-1650': person.born < 1650,
    'person--died-after-1800': person.died > 1800,
  });

  return (
    <tr
      className={rowClassName}
      onClick={() => markByClick(person.id)}
    >
      <td>{person.id}</td>
      <td className={columnClassName}>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.age}</td>
      <td>{person.century}</td>
      <td>{person.mother}</td>
      <td>{person.father}</td>
      <td>{person.children}</td>
    </tr>
  );
};

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    century: PropTypes.number.isRequired,
    mother: PropTypes.string,
    father: PropTypes.string,
    children: PropTypes.string,
  }).isRequired,
  selectedPerson: PropTypes.number,
  markByClick: PropTypes.func,
};

Person.defaultProps = {
  selectedPerson: null,
  markByClick: () => {},
};

export default Person;
