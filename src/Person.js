import React from 'react';

const Person = ({ item }) => (
  <tr>
    <td>{item.name}</td>
    <td>{item.sex}</td>
    <td>{item.born}</td>
    <td>{item.died}</td>
    <td>{item.mother}</td>
    <td>{item.father}</td>
  </tr>
);

export default Person;
