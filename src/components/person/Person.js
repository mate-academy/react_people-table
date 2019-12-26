import React from 'react';
import Children from '../children/Children';



const Person = (props) => {
  const {
    selectPerson,
    person: {
      id,
      name,
      sex,
      born,
      died,
      mother,
      father,
      age,
      century,
      selected,
      children,
    }
  } = props;

  return (
    <tr className={selected === true ? 'Person' : ''} onClick={() => selectPerson(id)}>
      <td>{id}</td>
      <td className={born < 1650 ? 'lineThrough' : ''}>{name}</td>
      <td className={sex === 'm' ? 'male' : 'female'}>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{father}</td>
      <td>{mother}</td>
      <td className={age >= 65 ? 'moreThen65' : ''}>{age}</td>
      <td>{century}</td>
      <Children children={children} />
    </tr>
  )
}

export default Person;
