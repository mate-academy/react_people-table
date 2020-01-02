import PropTypes from 'prop-types';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import cn from 'classnames';

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
      className={
        cn({
          tr: true,
          'Person--male': person.sex === 'm',
          'Person--female': person.sex === 'f',
          'Person--selected': person.name.toLowerCase() === personInURL,
          earlyBorn: person.born < 1650,
        })
      }

      onClick={personSelected}
    >
      <td>
        {person.id}
      </td>
      <td>
        {person.name}
      </td>
      <td>
        {person.sex}
      </td>
      <td>
        {person.born}
      </td>
      <td>
        {person.died}
      </td>
      <td>
        {person.mother}
      </td>
      <td>
        {person.father}
      </td>
      <td
        className={
          cn({
            greenLive: person.died - person.born >= 65,
          })
        }
      >
        {person.died - person.born}
      </td>
      <td>
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
