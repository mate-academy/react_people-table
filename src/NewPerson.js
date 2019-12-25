import React from 'react';
import PropTypes from 'prop-types';

const date = new Date();

class NewPerson extends React.Component {
  state = {
    name: '',
    sex: '',
    born: '',
    died: '',
    mother: '',
    father: '',
  };

  handleNameChange = ({ target: { value } }) => {
    this.setState({
      name: value.replace(/^ |[^a-zA-Z|\s]+/g, ''),
    });
  };

  handleSelect = ({ target: { value } }, key) => {
    this.setState({
      [key]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { addPerson, updateChildren, updateSortedPeople } = this.props;
    const { name, sex, born, died, mother, father } = this.state;

    addPerson(name.trim(), sex, born, died, mother, father);
    updateChildren();
    updateSortedPeople();

    this.setState(prevState => ({
      name: '',
      sex: prevState.sex,
      born: '',
      died: '',
      mother: '',
      father: '',
    }));
  };

  render() {
    const
      { name, sex, born, died, mother, father } = this.state;
    const { peopleList, years } = this.props;

    return (
      <form
        className="new-person"
        onSubmit={this.handleSubmit}
      >

        <input
          type="text"
          value={name}
          placeholder="Enter name"
          onChange={this.handleNameChange}
          className="new-person__name"
          required
        />

        <input
          type="radio"
          name="sex"
          value="m"
          required={sex === ''}
          id="male"
          onChange={event => this.handleSelect(event, 'sex')}
        />
        <label htmlFor="male">male</label>
        <input
          type="radio"
          name="sex"
          value="f"
          required={sex === ''}
          id="female"
          onChange={event => this.handleSelect(event, 'sex')}
        />
        <label htmlFor="female">female</label>

        <br />

        <select
          value={born}
          onChange={event => this.handleSelect(event, 'born')}
          className="new-person__year"
          required
        >
          <option value="">born</option>
          {[...years].map(year => (
            <option value={year} key={year}>{year}</option>
          ))}
        </select>

        <select
          value={died}
          onChange={event => this.handleSelect(event, 'died')}
          className="new-person__year"
          required
        >
          <option value="">died</option>
          {born && years
            .filter(yearOfDeath => yearOfDeath >= Number(born)
              && yearOfDeath <= Number(born) + 149)
            .map(year => (
              <option value={year} key={year}>{year}</option>
            ))}
          {date.getFullYear() - born < 150
          && (<option value={Infinity}>alive</option>)}
        </select>

        <br />

        <select
          value={mother}
          onChange={event => this.handleSelect(event, 'mother')}
          className="new-person__parent"
          required
        >
          <option value="">Choose mother</option>
          {born
          && peopleList
            .filter(person => person.sex === 'f' && person.died >= born
              && person.born <= born - 16)
            .map(woman => woman.name)
            .map(currentWoman => (
              <option
                value={currentWoman}
                key={currentWoman}
              >
                {currentWoman}
              </option>
            ))}
        </select>

        <select
          value={father}
          onChange={event => this.handleSelect(event, 'father')}
          className="new-person__parent"
          required
        >
          <option value="">Choose father</option>
          {born
          && peopleList
            .filter(person => person.sex === 'm' && person.died >= born
              && person.born <= born - 16)
            .map(man => man.name)
            .map(currentMan => (
              <option value={currentMan} key={currentMan}>{currentMan}</option>
            ))}
        </select>

        <br />

        <button
          type="submit"
          className="new-person__submit"
        >
          Add Person
        </button>
      </form>

    );
  }
}

NewPerson.propTypes = {
  peopleList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    mother: PropTypes.string.isRequired,
    father: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      sex: PropTypes.string,
    })).isRequired,
  })).isRequired,
  years: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  addPerson: PropTypes.func.isRequired,
  updateChildren: PropTypes.func.isRequired,
  updateSortedPeople: PropTypes.func.isRequired,
};

export default NewPerson;
