import React from 'react';

const Person = ({ item, id }) => (
  <tr className={`person--lived-in-${Math.ceil(item.died / 100)} person-row`}>
    <td>{id}</td>
    <td>{item.name}</td>
    <td className={item.sex === 'm' ? 'person--male' : 'person--female'}>{item.sex}</td>
    <td className={item.born < 1650 && 'born--before'}>{item.born}</td>
    <td className={item.died > 1800 && 'died--after'}>{item.died}</td>
    <td>{item.mother}</td>
    <td>{item.father}</td>
    <td className={item.age > 65 && 'long--livers'}>{item.age}</td>
    <td>{item.century}</td>
    <td className={item.children.length > 0 && item.sex === 'f' ? 'person--mather' : 'person--father'}>{item.children}</td>
  </tr>
);

export default Person;
