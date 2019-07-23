import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Person = ({ person, handleClick, selectedPersonId }) => (
  <tr
    className={classNames({
      person: true,
      'person--lived-over-65': person.age > 65,
      [`person--lived-in-${person.century}`]: true,
      'person--male': person.sex === 'm',
      'person--female': person.sex === 'f',
      'person--mother': person.sex === 'f' && person.children,
      'person--father': person.sex === 'm' && person.children,
      'row--selected': selectedPersonId,
    })}
    onClick={() => handleClick(person.id)}
  >
    <td>{person.id}</td>
    <td
      className={classNames({
        'born--before_1650': person.born < 1650,
        'died--after_1800': person.died > 1800,
      })}
    >
      {person.name}
    </td>
    <td>
      {person.sex}
    </td>
    <td>
      {person.born}
    </td>
    <td>{person.died}</td>
    <td>{person.mother}</td>
    <td>{person.father}</td>
    <td>{person.age}</td>
    <td>{person.century}</td>
    <td>{person.children.map(child => child.name).join(', ')}</td>
  </tr>
);

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    mother: PropTypes.string,
    father: PropTypes.string,
    age: PropTypes.number.isRequired,
    century: PropTypes.number.isRequired,
    children: PropTypes.array,
  }).isRequired,
  selectedPersonId: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default Person;
