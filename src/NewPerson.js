import React from "react";

const Person = ({ person }) => (
  <tr className="person">
    <td>{person.id}</td>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.father}</td>
    <td>{person.mother}</td>
  </tr>
);

export default Person;
