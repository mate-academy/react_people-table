import React from 'react';
import addingClassNames from './addingClassNames';
import addingClassNamesForTd from './addingClassNamesForTd';

import './Person.css';

const Person = ({ personDetails, handleSelect, selectedPersonId }) => {
  return (
    <tr
      onClick={() => handleSelect(personDetails.id)}
      className={addingClassNames(personDetails, selectedPersonId)}
    >
      <td>{personDetails.id}</td>
      <td className={addingClassNamesForTd(personDetails)}>
        {personDetails.name}
      </td>
      <td>{personDetails.sex}</td>
      <td>{personDetails.born}</td>
      <td>{personDetails.died}</td>
      <td>{personDetails.mother}</td>
      <td>{personDetails.father}</td>
      <td>{personDetails.age}</td>
      <td>{personDetails.century}</td>
      <td>{personDetails.children.join(', ')}</td>
    </tr>
  );
};

export default Person;
