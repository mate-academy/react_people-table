import React from 'react';
import propTypes from 'prop-types';
import './styles/person.css';

const selectRow = (event) => {
  const row = event.target.parentNode;
  const childrenTable = row.parentElement.childNodes;
  childrenTable.forEach((child) => {
    if (child.classList.contains('person--selected')) {
      child.classList.remove('person--selected');
    }
  });

  row.classList.toggle('person--selected');
};

const parentsClass = (person) => {
  if (person.children.length > 0) {
    return (person.sex === 'f')
      ? 'person person--mother'
      : 'person person--father';
  }
  return 'person';
};

const Person = ({ person }) => (
  <tr className={parentsClass(person)} onClick={selectRow}>
    <td className="person__item">{person.id + 1}</td>
    <td className="person__item">{person.name}</td>
    <td className="person__item">{person.sex}</td>
    <td className="person__item">{person.born}</td>
    <td className="person__item">{person.died}</td>
    <td className="person__item">{person.age}</td>
    <td className="person__item">{person.century}</td>
    <td className="person__item">{person.mother}</td>
    <td className="person__item">{person.father}</td>
    <td className="person__item">{person.children}</td>

  </tr>
);

Person.propTypes = {
  person: propTypes.shape({
    born: propTypes.number,
    died: propTypes.number,
    age: propTypes.number,
    century: propTypes.number,
    name: propTypes.string,
    sex: propTypes.string,
    mother: propTypes.string,
    father: propTypes.string,
    id: propTypes.number,
    children: propTypes.array,
  }).isRequired,
};

export default Person;
