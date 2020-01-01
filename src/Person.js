import PropTypes from 'prop-types';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const Person = ({
  person,
  index,
  personInURL,
}) => {
  const century = (Math.ceil(person.died / 100));
  const location = useLocation();
  const history = useHistory();

  const personSelected = () => {
    const addStringToURL = `/people/${
      person.name.toLowerCase().split(' ').join('-')}`;

    location.pathname = addStringToURL;
    history.location.pathname = addStringToURL;
    history.replace(location.pathname, addStringToURL);
  };

  return (
    <tr
      className={person.sex === 'm'
        ? `tr Person--male
          Person--lived-in-${century}
        `
        : `tr Person--female
          Person--lived-in-${century}
        `}

      id={person.name.toLowerCase() === personInURL
        ? 'Person--selected'
        : person.name}
      data-earlyborn={person.born < 1650 ? 'earlyBorn' : ''}
      onClick={personSelected}
    >
      <td className={index % 2 === 0 ? 'body__td' : 'body__td-light'}>
        {person.id}
      </td>
      <td className={index % 2 === 0 ? 'body__td' : 'body__td-light'}>
        {person.name}
      </td>
      <td className={index % 2 === 0 ? 'body__td' : 'body__td-light'}>
        {person.sex}
      </td>
      <td className={index % 2 === 0 ? 'body__td' : 'body__td-light'}>
        {person.born}
      </td>
      <td className={index % 2 === 0 ? 'body__td' : 'body__td-light'}>
        {person.died}
      </td>
      <td className={index % 2 === 0 ? 'body__td' : 'body__td-light'}>
        {person.mother}
      </td>
      <td className={index % 2 === 0 ? 'body__td' : 'body__td-light'}>
        {person.father}
      </td>
      <td
        className={index % 2 === 0 ? 'body__td' : 'body__td-light'}
        data-greenlive={person.died - person.born >= 65 ? 'greenLive' : ''}
      >
        {person.died - person.born}
      </td>
      <td className={index % 2 === 0 ? 'body__td' : 'body__td-light'}>
        {century}
      </td>
    </tr>
  );
};

Person.propTypes = {
  person: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  personInURL: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Person;
