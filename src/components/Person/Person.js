import React from 'react';

class Person extends React.Component {

  render() {
    const { person: { id, name, sex, age, born, died, century, father, mother, children },
      onClick, selectedId } = this.props;

    return (
      <tr
        active={selectedId === id ? 'true' : 'false'}
        onClick={onClick}
        data-person-id={id}
      >
        <td>{id}</td>
        <td className={born < 1650 ? 'bornBefore1650' : null}>
          {name}
        </td>
        <td>
          {sex === 'f' ? <span>&#x2640;</span> : <span>&#x2642;</span>}
        </td>
        <td className={age >= 65 ? 'ageAfter65' : ''}>
          {age}
        </td>
        <td>{born}</td>
        <td>{died}</td>
        <td>{century}</td>
        <td>{mother}</td>
        <td>{father}</td>
        <td>
          {children.map((child, index) =>
            (children.length - 1 !== index ? `${child.name}, ` : child.name))}
        </td>
      </tr>
    );
  }
}

export default Person;
