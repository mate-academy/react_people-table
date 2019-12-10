import React from 'react';
import PropTypes from 'prop-types';

class Person extends React.Component {
  state = { selectPerson: '' }

  personSex = person => (
    person.sex === 'm' ? 'person--male' : 'person--female'
  )

  bornYear = person => (
    person.born < 1650 ? 'person--born' : null
  )

  personAge = person => (
    person.died - person.born
  )

  personCentury = person => (
    Math.ceil(person.died / 100)
  )

  render() {
    return (
      this.props.people.map(person => (
        <tr
          key={person.name}
          className={`
            ${this.personSex(person)}
            Person--lived-in-${this.personCentury(person)}
            ${person.name === this.state.selectPerson ? 'selected' : null}`}
          onClick={() => {
            this.setState({ selectPerson: person.name });
          }}
        >
          {Object.values(person).map(data => (
            data === person.name
              ? <td className={this.bornYear(person)}>{data}</td>
              : <td>{data}</td>
          ))}
          <td className={this.personAge(person) >= 65
            ? 'person--old' : null}
          >
            {this.personAge(person)}
          </td>
          <td>{this.personCentury(person)}</td>
        </tr>
      ))
    );
  }
}

Person.propTypes = { people: PropTypes.arrayOf.isRequired };

export default Person;
