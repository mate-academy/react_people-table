import React from 'react';

const addSpecialClassForName = (person) => {
  let className = '';

  if (person.born < 1650) {
    className += 'born-before-1650';
  }

  if (person.died > 1800) {
    className += 'died-after-1800';
  }

  return className;
};

const addSpecialClassForPerson = (person) => {
  let className = `person person--lived-in-${person.century}`;

  if (person.sex === "m") {
    className += ' person--male';
  }

  if (person.sex === "f") {
    className += ' person--female';
  }

  if (person.age > 65) {
    className += ' over-65';
  }

  if (person.sex === "f" && person.children.length > 0) {
    className += ' person--mother';
  }

  if (person.sex === "m" && person.children.length > 0) {
    className += ' person--father';
  }

  return className;
};

const Person = ({ person }) => (
  <tr className={addSpecialClassForPerson(person)}>
    <td>{person.id}</td>
    <td className={addSpecialClassForName(person)}>
      {person.name}
    </td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.age}</td>
    <td>{person.century}</td>
    <td>{person.father}</td>
    <td>{person.mother}</td>
    <td>{person.children}</td>
  </tr>
);

export default Person;
