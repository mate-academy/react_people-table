import React from 'react';
import classnames from 'classnames'

class Person extends React.Component {
  state = {
    selectedPersonId: null,
  };

  render() {
    const { peoples } = this.props;
    const { selectedPersonId } = this.state;

    return (
      <tbody>
        {peoples.map((person) => (
          <tr
            key={person.id}
            onClick={() => this.setState({ selectedPersonId: person.id })}
            className={classnames({
              'person--lived-in-${Math.ceil(person.died / 100)}': true,
              'person-row': true,
              'person--male': person.sex === 'm',
              'person--female': person.sex === 'f',
              'person--father': person.sex === 'm' && person.children.length > 0,
              'person--mather': person.sex === 'f' && person.children.length > 0,
              'peopleTable__row': true,
              'peopleTable__row--selected': person.id === selectedPersonId,
            })
            }
          >
            <td>
              {person.id}
            </td>
            <td className={classnames({
              'born--before': person.born < 1650,
              'died--after': person.died > 1800,
            })}
            >
              {person.name}
            </td>
            <td>
              {person.sex}
            </td>
            <td>
              {person.born}
            </td>
            <td>
              {person.died}
            </td>
            <td>
              {person.mother}
            </td>
            <td>
              {person.father}
            </td>
            <td className={classnames({
              'long--livers': person.age > 65,
            })}
            >
              {person.age}
            </td>
            <td>
              {person.century}
            </td>
            <td>
              {person.children}
            </td>
          </tr>
        ))}
      </tbody>
    )
  }
}

export default Person;
