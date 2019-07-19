import React from 'react';

const Person = ({ item }) => (
  <tr className={`person--lived-in-${item.century} person-row`}>
    <td>
      {item.id}
    </td>
    <td>
      {item.name}
    </td>
    <td className={item.sex === 'm'
      ? 'person--male'
      : 'person--female'}
    >
      {item.sex}
    </td>
    <td className={item.born < 1650 && 'born--before'}>
      {item.born}
    </td>
    <td className={item.died > 1800 && 'died--after'}>
      {item.died}
    </td>
    <td>
      {item.mother}
    </td>
    <td>
      {item.father}
    </td>
    <td className={item.age > 65 && 'long--livers'}>
      {item.age}
    </td>
    <td>
      {item.century}
    </td>
    <td>
      {item.children}
    </td>
  </tr>
);

export default Person;
