/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
import './Person.css'

const Person = ({ person, onRowClick, selectedRow }) => {
  const {
    id,
    sex,
    born,
    died,
    century,
    age,
    children,
    father,
    mother,
    name,
  } = person

  return (
    <tr
      onClick={() => onRowClick(id)}
      className={`
        person
        ${sex === 'f' ? 'person-female' : 'person-male'}
        ${age > 65 && 'green-border'}
        person--lived-in-${century}
        ${children.length && sex === 'f' ? 'person--mother' : 'person--father'}
        ${children.length && sex === 'm' && 'color-blue'}
        ${selectedRow === id && 'selected-row'}
      `}
    >
      <td>
        {id}
      </td>
      <td className={`
          ${born < 1650 && 'line-through'}
          ${died > 1800 && 'bold'}
        `}
      >
        {name}
      </td>
      <td>
        {sex}
      </td>
      <td>
        {age}
      </td>
      <td>
        {century}
      </td>
      <td>
        {born}
      </td>
      <td>
        {died}
      </td>
      <td>
        {mother}
      </td>
      <td>
        {father}
      </td>
      <td>
        {children.map(child => child.name).join(', ') || 'None'}
      </td>
    </tr>
  )
}

export default Person
