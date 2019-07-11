import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

const Person = ({ person, i }) => (
  <tr className="person">
    <td>
      {i + 1}
    </td>
    <td>{person.name}</td>
    <td
      className={person.sex === 'm' ? 'person--male' : 'person--female'}
    >
      {person.sex}
    </td>
    <td
      className={person.born < 1650
        ? 'people__Born--Before'
        : ''}
    >
      {person.born}
    </td>
    <td className={person.died > 1800
      ? 'people__Died--Before'
      : `person--lived-in-${person.century}`}
    >
      {person.died}
    </td>
    <td>{person.mother}</td>
    <td
      className={(person.sex === 'm' && person.children.length > 0)
        ? 'person--father'
        : ''}
    >
      {person.father}
    </td>
    <td className={person.age > 65
      ? 'people__old'
      : ''}
    >
      {person.age}
    </td>
    <td className={`person--lived-in-${person.century}`}>{person.century}</td>
    <td>
      {person.children.join(', ')}
    </td>
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
  }).isRequired,
  i: PropTypes.number.isRequired,
};

export default Person;
