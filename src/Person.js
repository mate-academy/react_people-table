import React from 'react';

import './Person.css'

const Person = ({p, i}) => (
    <tr className="person" >
      <td>{i+1}</td>
      <td className={(p.born <= 1650)
          ? 'person-born-line'
          : (p.died >= 1800)
          ? 'person-bold'
          : ''}
      >
            {p.name}
      </td>
      <td className={p.sex==='f'  ? 'person-female' : ''}>{p.sex}</td>
      <td>{p.born}</td>
      <td>{p.died}</td>
      <td>{p.mother}</td>
      <td className={p.children.length ? 'person-father' : ''}>{p.father}</td>
      <td className={p.age > 65 ? 'person-age-greenborder' : ''}>{p.age}</td>
      <td>{p.century}</td>
      <td>{p.children.join(', ')}</td>
    </tr>
)

export default Person;