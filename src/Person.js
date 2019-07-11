import React from 'react';

const Person = ({ item, index }) => (
  <tr className={`person--lived-in-${Math.ceil(item.died / 100)}`}>
    <td>{index}</td>
    <td>{item.name}</td>
    <td className={item.sex === 'm' ? 'person--male' : 'person--female'}>{item.sex}</td>
    <td className={item.born < 1650 && 'born--before'}>{item.born}</td>
    <td className={item.died > 1800 && 'died--after'}>{item.died}</td>
    <td>{item.mother}</td>
    <td>{item.father}</td>
    <td className={(item.died - item.born) > 65 && 'long--livers'}>{item.died - item.born}</td>
    <td>{Math.ceil(item.died / 100)}</td>
  </tr>
);

export default Person;
