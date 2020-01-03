import React from 'react';
import './Person.css';
import PropTypes from 'prop-types';

const Person = (props) => {
  const { person } = props;
  let sexClassName = '';

  if (person.sex === 'm') {
    sexClassName = 'male';
  } else if (person.sex === 'f') {
    sexClassName = 'female';
  }

  return (
    <tr
      data-person-id={person.id}
      onClick={props.handleClick}
      className={`
        Person 
        Person--${sexClassName} 
        Person--lived-in-${Math.ceil(person.died / 100)}
        ${props.selectedPersonId === person.id ? 'Person--selected' : ''}
        `}
    >
      <td className="person-id">{person.id}</td>
      <td
        className={`person-name ${person.born < 1650 ? 'crossed-out' : ''}`}
      >
        {person.name}
      </td>
      <td className="person-sex">{person.sex}</td>
      <td className="person-born">{person.born}</td>
      <td className="person-died">{person.died}</td>
      <td
        className={`
          person-age 
          ${person.died - person.born >= 65 ? 'highlighted' : ''}
          `}
      >
        {person.died - person.born}
      </td>
      <td className="person-century">{Math.ceil(person.died / 100)}</td>
      <td className="person-mother">{person.mother}</td>
      <td className="person-father">{person.father}</td>
    </tr>
  );
};

Person.propTypes = {
  person: PropTypes.objectOf(PropTypes.any),
  handleClick: PropTypes.func,
  selectedPersonId: PropTypes.number,
};

Person.defaultProps = {
  person: {},
  handleClick: {},
  selectedPersonId: -1,
};

export default Person;
