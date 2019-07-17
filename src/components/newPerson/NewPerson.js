import React from 'react';
import PropTypes from 'prop-types';
import './newPerson.css';

let possibleParents = [];
let mothers = [];
let fathers = [];
let errorMessage = '';
const maxYear = new Date().getFullYear();

class NewPerson extends React.Component {
  state ={
    name: '',
    sex: '',
    born: '',
    died: '',
    mother: '',
    father: '',
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    const { born, died } = this.state;

    if ((name === 'died' || name === 'born') && value > maxYear) {
      return;
    }

    if (name === 'died' && born !== '') {
      if (value - born > 150 || value - born < 0) {
        errorMessage = 'Age must be less than 150 and more than 0';
      } else {
        errorMessage = '';
      }
    }

    if (name === 'born' && died !== '') {
      if (died - value > 150 || died - value < 0) {
        errorMessage = 'Age must be less than 150 and more than 0';
      } else {
        errorMessage = '';
      }
    }

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { people, updateAppState } = this.props;
    const { born, died, ...rest } = this.state;
    const newPeople = [...people];

    if (died - born > 150 || died - born < 0) {
      errorMessage = 'Age must be less than 150 and more than 0';
      return;
    }

    newPeople.push({
      ...rest,
      born: +born,
      died: +died,
      id: people.length,
      age: died - born,
      children: [],
    });

    this.setState({
      name: '',
      sex: '',
      born: '',
      died: '',
      mother: '',
      father: '',
    });

    updateAppState(
      {
        listOfPeople: [...newPeople],
        filtredPeople: [...newPeople],
        filterInput: '',
      }
    );
  };

  formClose = () => {
    this.props.updateAppState({ showNewPersonForm: false });
  }

  render() {
    const { name, sex, born, died, mother, father } = this.state;

    possibleParents = this.props.people.filter(person => (
      +person.born + 13 <= +born && +person.died > +born
    ));

    mothers = possibleParents
      .filter(person => person.sex === 'f')
      .map((woman, index) => (
        <option key={`f${index + 10}`}>
          {woman.name}
        </option>
      ));

    fathers = possibleParents
      .filter(person => person.sex === 'm')
      .map((man, index) => (
        <option key={`m${index + 10}`}>
          {man.name}
        </option>
      ));

    return (
      <form
        name="newPerson"
        className="new-person-form"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          className="new-person-form__name"
          onChange={this.handleChange}
          required
        />

        <div className="new-person-form__sex">
          <label htmlFor="newPerson-male">
            <input
              id="newPerson-male"
              type="radio"
              name="sex"
              value="m"
              checked={sex === 'm'}
              onChange={this.handleChange}
              required
            />
            male
          </label>

          <label htmlFor="newPerson-female">
            <input
              id="newPerson-female"
              type="radio"
              name="sex"
              value="f"
              checked={sex === 'f'}
              onChange={this.handleChange}
            />
            female
          </label>
        </div>


        <label htmlFor="newPerson-born">
          Born:
          <input
            id="newPerson-born"
            type="number"
            min="1500"
            name="born"
            value={born}
            placeholder="Year of born"
            className="new-person-form__life-dates"
            onChange={this.handleChange}
            required
          />
        </label>

        <label htmlFor="newPerson-died">
          Died:
          <input
            id="newPerson-died"
            type="number"
            min="1500"
            name="died"
            value={died}
            placeholder="Year of died"
            className="new-person-form__life-dates"
            onChange={this.handleChange}
            required
          />
        </label>

        <span className="error-message">{errorMessage}</span>

        <label htmlFor="newPerson-mother" className="new-person-form__parents">
          <span>Mother:</span>
          <select
            id="newPerson-mother"
            name="mother"
            value={mother}
            onChange={this.handleChange}
          >
            <option> </option>
            {mothers}
          </select>
        </label>

        <label htmlFor="newPerson-father" className="new-person-form__parents">
          <span>Father:</span>
          <select
            id="newPerson-father"
            name="father"
            value={father}
            onChange={this.handleChange}
          >
            <option> </option>
            {fathers}
          </select>
        </label>

        <button
          type="submit"
          className="new-person-form__button"
        >
          Add new person
        </button>

        <button
          type="button"
          onClick={this.formClose}
          className="new-person-form__button"
        >
          Close
        </button>

      </form>
    );
  }
}

NewPerson.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object),
  updateAppState: PropTypes.func.isRequired,
};

NewPerson.defaultProps = {
  people: [],
};

export default NewPerson;
