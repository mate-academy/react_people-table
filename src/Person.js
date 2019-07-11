import React from 'react';

const Person = ({ person }) => (
  <>
    {person.sex === "f" ? (
      <tr className="person person--female">
        <td>{person.id}</td>
        <td>{person.name}</td>
        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>{person.father}</td>
        <td>{person.mother}</td>
      </tr>
    ) : (
      <tr className="person person--male">
        <td>{person.id}</td>
        <td>{person.name}</td>
        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>{person.father}</td>
        <td>{person.mother}</td>
      </tr>
    )}
  </>
);

export default Person;
