import React from 'react';
import PropTypes from 'prop-types';

class Person extends React.Component {
  state = { selectPerson: '' }

  personSex = person => (
    person.sex === 'm' ? 'person--male' : 'person--female'
  )

  bornYear = person => (
    person.born < 1650 ? 'person--born' : ''
  )

  personAge = person => (
    person.died - person.born
  )

  personCentury = person => (
    Math.ceil(person.died / 100)
  )

  selectText = (data) => {
    const text = this.props.selectText;

    if (!text || !String(data).includes(text)) {
      return data;
    }

    const pattern = new RegExp(text, 'g');

    const result = data
      .replace(pattern, ',<span></span>,')
      .split(',')
      .map(item => (item === '<span></span>'
        ? <span className="select--text">{text}</span>
        : item));

    return result;
  }

  render() {
    return (
      this.props.people.map(person => (
        <tr
          key={person.name}
          className={`
            ${this.personSex(person)}
            Person--lived-in-${this.personCentury(person)}
            ${person.name === this.state.selectPerson ? 'selected' : ''}`}
          onClick={() => {
            this.setState({ selectPerson: person.name });
          }}
        >
          {Object.values(person).map(data => (
            data === person.name
              ? (
                <td className={this.bornYear(person)}>
                  {this.selectText(data)}
                </td>
              )
              : <td>{this.selectText(data)}</td>
          ))}
          <td className={this.personAge(person) >= 65
            ? 'person--old' : ''}
          >
            {this.personAge(person)}
          </td>
          <td>{this.personCentury(person)}</td>
        </tr>
      ))
    );
  }
}

Person.propTypes = {
  people: PropTypes.arrayOf.isRequired,
  selectText: PropTypes.string.isRequired,
};

export default Person;
