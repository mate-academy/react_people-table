import React from 'react';
import PropTypes from 'prop-types';

import createClassForName from './createClassForName';
import createClassForPerson from './createClassForPerson';

import './person.css';

const Person = ({ person }) => (
  <tr className={createClassForPerson(person)}>
    <td>{person.id}</td>
    <td className={createClassForName(person)}>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.century}</td>
    <td>{person.age}</td>
    <td>{person.mother}</td>
    <td>{person.father}</td>
    <td>{person.children.join(', ')}</td>
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
    mother: PropTypes.string,
    father: PropTypes.string,
    children: PropTypes.array,
    century: PropTypes.number,
  }).isRequired,
};

export default Person;
