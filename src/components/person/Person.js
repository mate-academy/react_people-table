import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Person = ({ person, selectLine, selectedLine }) => (
  <tr
    className={classNames({
      active: selectedLine,
    })}
    onClick={() => selectLine(person.id)}
  >
    <td>{person.id}</td>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td className={person.age > 65 ? 'positive' : null}>
      {person.age}
    </td>
    <td>{person.century}</td>
    <td>{person.mother}</td>
    <td>{person.father}</td>
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
  }).isRequired,
  selectedLine: PropTypes.number.isRequired,
  selectLine: PropTypes.func.isRequired,
};

export default Person;
