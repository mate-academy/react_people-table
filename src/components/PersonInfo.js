import React from 'react';
import PropTypes from 'prop-types';

import getClassForPersonsName from './getClassForPersonsName';
import getClassForPersonsInfo from './getClassForPersonsInfo';
import getSelectedElement from './getSelectedElement';

const PersonInfo = ({ person }) => (
  <tr
    className={getClassForPersonsInfo(person)}
    onClick={getSelectedElement}
  >
    <td>{person.id}</td>

    <td
      className={getClassForPersonsName(person)}
    >
      {person.name}
    </td>

    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.age}</td>
    <td>{person.mother}</td>
    <td>{person.father}</td>
    <td>{person.children.join(', ')}</td>
  </tr>
);

PersonInfo.propTypes = {
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
  }).isRequired,
};

export default PersonInfo;
