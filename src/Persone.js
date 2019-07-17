import React from 'react';
import PropTypes from 'prop-types';
import './Persone.css';
import classnames from 'classnames';

const Person = ({ person, handleSelect, selected }) => (
  <tr
    key={person.name}
    className={classnames({
      'person--selected': selected,
    })}
    onClick={handleSelect}
  >
    <td>{person.id}</td>
    <td>{person.name}</td>
    <td
      className={classnames({
        peopleTable__row: true,
        'person--male': person.sex === 'm',
        'person--female': person.sex === 'f',
      })}
    >
      {person.sex}
    </td>
    <td
      className={classnames({
        peopleTable__row: true,
        'people__Born--Before_1650': person.born < 1650,
      })}
    >
      {person.born}
    </td>
    <td
      className={classnames({
        peopleTable__row: true,
        'people__Died--Before_1800': person.died > 1800,
      })}
    >
      {person.died}
    </td>
    <td>{person.mother}</td>
    <td
      className={classnames({
        peopleTable__row: true,
        'person--father': person.sex === 'm' && person.children.length > 0,
      })}
    >
      {person.father}
    </td>
    <td
      className={classnames({
        peopleTable__row: true,
        people__old_65: ((person.died - person.born) > 65),
      })}
    >
      {person.age}
    </td>
    <td
      className={classnames({
        peopleTable__row: true,
        [`person--lived-in-${person.century}`]: true,
      })}
    >
      {person.century}
    </td>
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

Person.propTypes = {
  person: PropTypes.shape(Person.propTypes).isRequired,
  selected: PropTypes.bool,
  handleSelect: PropTypes.func,
};

Person.defaultProps = {
  selected: false,
  handleSelect: () => {},
};

export default Person;
