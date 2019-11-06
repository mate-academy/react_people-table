import React, { Component } from 'react';

export default class Person extends Component {

  render() {
    const { person, select, index } = this.props;
    let romanCentury = ``;

    switch(person.century) {
      case 16:
        romanCentury = `XVI`;
        break;
      case 17:
        romanCentury = `XVII`;
        break;
      case 18:
        romanCentury = `XVIII`;
        break;
      case 19:
        romanCentury = `XIX`;
        break;
      case 20:
        romanCentury = `XX`;
        break;
      default:
        romanCentury = `XXI`
        break;
    }

    let active = (person.id > 0 && person.id === index) ? `bg-secondary` : ``;
    let children = ``;
    person.children.forEach(child => children += `${child.name} `);

    return (
      <tr className={active} onClick={() => select(person.id)}>
        <td>{person.id}</td>
        <td>{person.name}</td>
        <td>
          {person.sex === `f` ?
            <i className="fa fa-venus text-danger" />
            : <i className="fa fa-mars text-primary" />
          }
        </td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>{romanCentury}</td>
        <td>
          {person.age >= 65 ?
            <span className="text-success">{person.age}</span>
            : <span>{person.age}</span>
          }
        </td>
        <td>{person.mother}</td>
        <td>{person.father}</td>
        <td>{children}</td>
      </tr>
    );
  }
}
