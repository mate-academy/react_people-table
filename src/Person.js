import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import PersonName from './PersonName';

const Person = ({ person }) => (
  <>
    <td>{person.id}</td>
    <td
      className={cn({ 'born-before-1650': person.born < 1650 })
      }
    >
      <PersonName person={person} />
    </td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td><PersonName mother={person.mother} /></td>
    <td><PersonName father={person.father} /></td>
    <td className={cn({
      older_than_65: person.age >= 65,
      younger_than_65: person.age < 65,
    })}
    >
      {person.age}
    </td>
    <td>{person.century}</td>
    <td><PersonName kids={person.children} /></td>
  </>
);

Person.propTypes = {
  person: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Person;
