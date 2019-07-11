import React from 'react';
import PropTypes from 'prop-types';
import { addClassForPerson, addClassForName } from './setClassName';

const Person = ({ person }) => (
  <tr className={addClassForPerson(person)}>
    <td>{person.id}</td>
    <td className={addClassForName(person)}>
      {person.name}
    </td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.age}</td>
    <td>{person.century}</td>
    <td>{person.father}</td>
    <td>{person.mother}</td>
    <td>{person.children}</td>
  </tr>
);

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    age: PropTypes.number,
    century: PropTypes.number,
    mother: PropTypes.string,
    father: PropTypes.string,
    children: PropTypes.string,
  }).isRequired,
};

export default Person;
