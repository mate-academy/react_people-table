import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
} from 'react-router-dom';

const Person = ({ person, history, location }) => (
  <tr
    className={person.sex === 'f' ? 'female' : 'male'}
    onClick={() => {
      history.push({
        pathname: `/people/${person.name.replace(/\s/g, '_').toLowerCase()}`,
        search: location.search,
      });
    }}
  >

    <td>{person.id}</td>
    <td
      className={person.born < 1650 ? 'early1650 person__name' : 'person__name'}
    >
      <NavLink
        to={`/people/${person.name.replace(/\s/g, '_').toLowerCase()}`}
        className="link__name"
      >
        {person.name}
      </NavLink>
    </td>
    <td>{person.sex}</td>
    <td>{person.century}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td
      className={person.age >= 65
        ? 'older_65'
        : ''}
    >
      {person.age}
    </td>
    <td>{person.mother}</td>
    <td>{person.father}</td>
    <td>{person.children}</td>
  </tr>
);

Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    father: PropTypes.string,
    mother: PropTypes.string,
    id: PropTypes.number,
    age: PropTypes.number,
    century: PropTypes.number,
    children: PropTypes.string,
  }).isRequired,
  history: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.func,
  ])).isRequired,
  location: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ])).isRequired,
};

export default Person;
