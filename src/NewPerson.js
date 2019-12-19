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
    this.setState(prevState => ({
      name: value.replace(/^ +|[^a-z\s]+/g, ''),
    }));
  };

  handleSelectSex = ({ target: { value } }) => {
    this.setState(prevState => ({
      sex: value,
    }));
  };

  handleSelectBorn = ({ target: { value } }) => {
    this.setState(prevState => ({
      born: value,
    }));
  };

  handleSelectDied = ({ target: { value } }) => {
    this.setState(prevState => ({
      died: value,
    }));
  };

  handleSelectMother = ({ target: { value } }) => {
    this.setState(prevState => ({
      mother: value,
    }));
  };

  handleSelectFather = ({ target: { value } }) => {
    this.setState(prevState => ({
      father: value,
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { addPerson, updateChildren, updateSortedPeople } = this.props;
    const { name, sex, born, died, mother, father } = this.state;

    if (name.trim()) {
      addPerson(name, sex, born, died, mother, father);
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
    }
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
          id="male"
          onChange={event => this.handleSelectSex(event)}
        />
        <label htmlFor="male" className={`new-person__${sex}`}>male</label>
        <input
          type="radio"
          name="sex"
          value="f"
          id="female"
          onChange={event => this.handleSelectSex(event)}
        />
        <label htmlFor="female" className={`new-person__${sex}`}>female</label>

        <br />

        <select
          value={born}
          onChange={event => this.handleSelectBorn(event)}
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
          onChange={event => this.handleSelectDied(event)}
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
          onChange={event => this.handleSelectMother(event)}
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
          onChange={event => this.handleSelectFather(event)}
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
  peopleList: PropTypes.oneOfType(Array).isRequired,
  years: PropTypes.oneOfType(Array).isRequired,
  addPerson: PropTypes.func.isRequired,
  updateChildren: PropTypes.func.isRequired,
  updateSortedPeople: PropTypes.func.isRequired,
};

export default NewPerson;
