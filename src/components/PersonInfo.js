import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import getClassForPersonsName from './getClassForPersonsName';
import getClassForPersonsInfo from './getClassForPersonsInfo';

class PersonInfo extends React.Component {
  state = {
    selectedPersonId: null,
  };

  render() {
    const { people } = this.props;
    const { selectedPersonId } = this.state;

    return (
      people.map(person => (
        <tr
          key={person.id}
          className={classnames(getClassForPersonsInfo(person), {
            'person--selected': person.id === selectedPersonId,
          })}
          onClick={() => this.setState({ selectedPersonId: person.id })}
        >
          <td>{person.id}</td>

          <td
            className={getClassForPersonsName(person)}
          >
            {person.name}
          </td>

          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{person.age}</td>
          <td>{person.mother}</td>
          <td>{person.father}</td>
          <td>{person.children.join(', ')}</td>
        </tr>
      )));
  }
}

PersonInfo.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  person: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    age: PropTypes.number,
    mother: PropTypes.string,
    father: PropTypes.string,
    children: PropTypes.array,
  }).isRequired,
};

export default PersonInfo;
