import React from 'react';
import propTypes from 'prop-types';
import './styles/person.css';

const Person = ({ person }) => (
  <tr className="person">
    <td className="person__item">{person.id + 1}</td>
    <td className="person__item">{person.name}</td>
    <td className="person__item">{person.sex}</td>
    <td className="person__item">{person.born}</td>
    <td className="person__item">{person.died}</td>
    <td className="person__item">{person.died - person.born}</td>
    <td className="person__item">{Math.ceil(person.died / 100)}</td>
    <td className="person__item">{person.mother}</td>
    <td className="person__item">{person.father}</td>
  </tr>
);

Person.propTypes = {
  person: propTypes.shape({
    born: propTypes.number,
    died: propTypes.number,
    name: propTypes.string,
    sex: propTypes.string,
    mother: propTypes.string,
    father: propTypes.string,
    id: propTypes.number,
  }).isRequired,
};

export default Person;
