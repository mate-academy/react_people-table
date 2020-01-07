import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';

const Person = ({ person }) => {
  const history = useHistory();
  const location = useLocation();

  const handleNameChange = () => {
    history.push({
      pathname: `/people/${person.name.replace(/\s/g, '_')}`,
      search: location.search,
    });
  };

  return (
    <tr onClick={handleNameChange}>
      <td className="people__table-items people__table-items-id">
        {person.id}
      </td>
      <td className={person.born < 1650
        ? 'born-before-1650'
        : 'people__table-items'}
      >
        {person.name}
      </td>
      <td className={person.sex === 'f' ? 'female' : 'male'}>
        {person.sex}
      </td>
      <td className="people__table-items">{person.born}</td>
      <td className="people__table-items">{person.died}</td>
      <td className="people__table-items">{person.father}</td>
      <td className="people__table-items">{person.mother}</td>
      <td className={person.age >= 65
        ? 'high-longevity'
        : 'people__table-items'}
      >
        {person.age}
      </td>
      <td className="people__table-items">{person.century}</td>
    </tr>
  );
};

export default Person;

Person.propTypes = {
  person: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])
  ).isRequired,
};
