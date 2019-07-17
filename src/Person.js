import React from 'react';
import classnames from 'classnames'

class Person extends React.Component {
  state = {
    selectedPersonId: null,
  };

  render() {
    const { people } = this.props;
    const { selectedPersonId } = this.state;

    return (
      <tr
        onClick={() => this.setState({ selectedPersonId: people.id })}
        className={classnames({
          'person--lived-in-${Math.ceil(person.died / 100)}': true,
          'person-row': true,
          'person--male': people.sex === 'm',
          'person--female': people.sex === 'f',
          'person--father': people.sex === 'm' && people.children.length > 0,
          'person--mather': people.sex === 'f' && people.children.length > 0,
          'peopleTable__row': true,
          'peopleTable__row--selected': people.id === selectedPersonId,
        })
        }
      >
        <td>
          {people.id}
        </td>
        <td className={classnames({
          'born--before': people.born < 1650,
          'died--after': people.died > 1800,
        })}>
          {people.name}
        </td>
        <td>
          {people.sex}
        </td>
        <td>
          {people.born}
        </td>
        <td>
          {people.died}
        </td>
        <td>
          {people.mother}
        </td>
        <td>
          {people.father}
        </td>
        <td className={classnames({
          'long--livers': people.age > 65,
        })}
        >
          {people.age}
        </td>
        <td>
          {people.century}
        </td>
        <td>
          {people.children}
        </td>
      </tr>
    )
  }
}

export default Person;
