import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class Person extends React.Component {
  state = { selectPerson: '' }

  selectText = (data) => {
    const text = this.props.selectText;

    if (!text || !String(data).toLowerCase().includes(text)) {
      return data;
    }

    if (!data) {
      return '';
    }

    const result = [];

    for (let i = 0; i < data.length; i += 1) {
      const str = data.slice(i, i + text.length);

      if (str.toLowerCase() === text) {
        result.push(<span className="select--text">{str}</span>);
        i += str.length - 1;
      } else {
        result.push(data[i]);
      }
    }

    return result;
  }

  render() {
    const { selectPerson } = this.state;

    return (
      this.props.people.map(person => (
        <tr
          key={person.name}
          className={
            cn(person.sex === 'm' ? 'person--male' : 'person--female',
              `Person--lived-in-${Math.ceil(person.died / 100)}`,
              person.name === selectPerson ? 'selected' : '')}
          onClick={() => this.setState({ selectPerson: person.name })}
        >
          {Object.values(person).map(data => (
            data === person.name
              ? (
                <td className={person.born < 1650 ? 'person--born' : ''}>
                  {this.selectText(data)}
                </td>
              )
              : <td>{this.selectText(data)}</td>
          ))}
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
