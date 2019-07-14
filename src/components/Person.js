import React from 'react';

function Person({ personData, id, people }) {
  return (
    <tr className={personData.personClass}>
      <td data="center">{id}</td>
      <td>{personData.name}</td>
      <td data="center">{personData.sex}</td>
      <td data="center">{personData.born}</td>
      <td data="center">{personData.died}</td>
      <td data="center">{personData.age}</td>
      <td data="center">{personData.century}</td>
      <td>{personData.mother}</td>
      <td>{personData.father}</td>
      <td>{personData.childrenList}</td>
    </tr>
  );
}

export default Person;
