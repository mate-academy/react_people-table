import React from 'react';
import './App.css';
import classNames from 'classnames/bind';

const Person = ({ person, handleSelect, isSelected }) => (
  <tr
    key={person.id}
    onClick={handleSelect}
    className={classNames({
      [`person--lived-in-${person.century}-century`]: true,
      PeopleTable__row: true,
      'PeopleTable__row--selected': isSelected,
    })}
  >
    <td>{person.id}</td>
    <td className={classNames({
      'Person--born-before_1650': person.born < 1650,
      'Person--died-before_1800': person.died > 1800,
    })}
    >{person.name}
    </td>
    <td className={classNames({
      'Person--female': person.sex === 'f',
      'Person--male': person.sex === 'm',
    })}
    >
      {person.sex}
    </td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.mother}</td>
    <td>{person.father}</td>
    <td
      className={classNames({
        'Person--age-65': person.age >= 65,
      })}
    >
      {person.age}
    </td>
    <td>{person.century}</td>
    <td>{person.children}</td>
  </tr>
);

export default Person;
