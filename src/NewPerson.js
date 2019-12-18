import React from 'react';
import PropTypes from 'prop-types';

const date = new Date();
const years = [];

for (let i = 1530; i <= date.getFullYear(); i += 1) {
  years.push(i);
}

class NewPerson extends React.Component {
  state = {
    name: '',
    sex: 'm',
    born: '',
    died: '',
    mother: '',
    father: '',
    nameError: '',
    bornError: '',
    ageError: '',
  };

  handleNameChange = ({ target: { value } }) => {
    this.setState(prevState => ({
      name: value,
      nameError: '',
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
      bornError: '',
      ageError: '',
    }));
  };

  handleSelectDied = ({ target: { value } }) => {
    this.setState(prevState => ({
      died: value,
      ageError: '',
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
    const { addPerson, updateChildren } = this.props;
    const { name, sex, born, died, mother, father } = this.state;

    if (!name.trim() || name.match(/[^a-z\s]+/g)) {
      this.setState(prevState => ({
        nameError: 'invalid name',
      }));
    }

    if (!born) {
      this.setState(prevState => ({
        bornError: 'choose year of birth',
      }));
    }

    if ((died ? died - born > 150 : date.getFullYear() - born > 150)) {
      this.setState(prevState => ({
        ageError: 'age is too big',
      }));
    }

    if ((died - born < 0)) {
      this.setState(prevState => ({
        ageError: 'invalid dates',
      }));
    }

    if (name.trim() && born
      && (died ? died - born > 0 : date.getFullYear() - born > 0)
      && (died ? died - born <= 150 : date.getFullYear() - born <= 150)) {
      addPerson(name, sex, born, died, mother, father);
      updateChildren();

      this.setState(prevState => ({
        name: '',
        sex: 'm',
        born: '',
        died: '',
        mother: '',
        father: '',
        nameError: '',
        bornError: '',
        ageError: '',
      }));
    }
  };

  render() {
    const
      {
        name,
        sex,
        born,
        died,
        mother,
        father,
        nameError,
        bornError,
        ageError,
      } = this.state;
    const { peopleList } = this.props;

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
        />
        {nameError && <div className="new-person__err">{nameError}</div>}

        <select
          value={sex}
          onChange={event => this.handleSelectSex(event)}
          className="new-person__sex"
        >
          <option value="m">male</option>
          <option value="f">female</option>
        </select>

        <select
          value={born}
          onChange={event => this.handleSelectBorn(event)}
          className="new-person__year"
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
        >
          <option value="">died</option>
          {[...years].map(year => (
            <option value={year} key={year}>{year}</option>
          ))}
        </select>

        {bornError && <div className="new-person__err">{bornError}</div>}
        {born && ageError && <div className="new-person__err">{ageError}</div>}

        <br />

        <select
          value={mother}
          onChange={event => this.handleSelectMother(event)}
          className="new-person__parent"
        >
          <option value="">Choose mother</option>
          {born
          && peopleList
            .filter(person => person.sex === 'f' && person.died > born)
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
        >
          <option value="">Choose father</option>
          {born
          && peopleList
            .filter(person => person.sex === 'm' && person.died > born)
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
  addPerson: PropTypes.func.isRequired,
  updateChildren: PropTypes.func.isRequired,
};

export default NewPerson;
