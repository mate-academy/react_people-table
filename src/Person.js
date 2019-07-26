import React from 'react';
import PropTypes from 'prop-types';

class Person extends React.Component {
  state = {
    personalId: null,
  }

  render() {
    const { person } = this.props;
    const { personalId } = this.state;

    const personSex = (person.sex === 'm')
      ? 'Person--male'
      : 'Person--female';

    const tooOld = (person.born < 1650)
      ? 'tooOld'
      : null;

    const longLiver = (person.age >= 65)
      ? 'longLiver'
      : null;

    const centuryClass = ` Person--lived-in-${person.century}`;
    const trClasses = personSex + centuryClass;
    const personSelected = (person.id === personalId) ? 'Person--selected' : '';

    return (
      <tr
        onClick={() => this.setState({ personalId: person.id })}
        className={`${trClasses} ${personSelected}`}
      >
        <td>{person.id}</td>
        <td className={tooOld}>{person.name}</td>
        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td className={longLiver}>{person.age}</td>
        <td>{person.century}</td>
        <td>{person.father}</td>
        <td>{person.mother}</td>
      </tr>
    );
  }
}

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    age: PropTypes.number,
    century: PropTypes.number,
    father: PropTypes.string,
    mother: PropTypes.string,
  }).isRequired,
};

export default Person;
