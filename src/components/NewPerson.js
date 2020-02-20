import React from 'react';
import PropTypes from 'prop-types';

class NewPerson extends React.Component {
  state={
    name: '',
    sex: false,
    born: '',
    died: '',
    mother: '',
    father: '',
  }

  handleNewPerson = (event) => {
    const { name } = event.target;
    let { value } = event.target;

    switch (name) {
      case 'name':
      case 'mother':
      case 'father':
        value = value.replace(/[^A-Za-z ]/, '');
        break;

      case 'born':
        this.setState({
          father: '',
          mother: '',
        });

        value = value.replace(/\D/g, '');
        break;

      default:
        value = value.replace(/\D/g, '');
    }

    this.setState({
      [name]: value,
    });
  }

  getParrents = (parentSex, people, childBorn) => people
    .filter(parent => (
      parent.sex === parentSex
        && parent.born < childBorn
        && parent.died > childBorn
    ))
    .map(parent => (
      <option
        key={parent.id + parent.name}
        value={parent.name}
      >
        {parent.name}
      </option>
    ))

  render() {
    const { people, handleNewPersonSubmit } = this.props;
    const {
      name, sex, born, died, father, mother,
    } = this.state;
    const optionsOfFathers = this.getParrents('m', people, born);
    const optionsOfMathers = this.getParrents('f', people, born);

    return (
      <div>
        <form onSubmit={handleNewPersonSubmit}>
          <input
            type="text"
            name="name"
            placeholder="name"
            maxLength="60"
            value={name}
            onChange={this.handleNewPerson}
            required
          />

          <label htmlFor="femaleRadio">
            <input
              name="sex"
              type="radio"
              value="f"
              required
              onChange={this.handleNewPerson}
              id="femaleRadio"
            />
              Female
          </label>

          <label htmlFor="maleRadio">
            <input
              name="sex"
              type="radio"
              value="m"
              required
              onChange={this.handleNewPerson}
              id="maleRadio"
            />
            Male
          </label>

          <input
            name="born"
            type="text"
            placeholder="born year"
            maxLength="4"
            minLength="4"
            required
            value={born}
            onChange={this.handleNewPerson}
          />

          <input
            name="died"
            type="text"
            placeholder="died year"
            maxLength="4"
            minLength="4"
            required
            value={died}
            onChange={this.handleNewPerson}
          />

          <input
            name="father"
            type="text"
            placeholder="father"
            required
            value={father}
            onChange={this.handleNewPerson}
          />

          <select
            name="father"
            value={father}
            onChange={this.handleNewPerson}
          >
            <option hidden>Selet Father</option>
            {optionsOfFathers}
          </select>

          <input
            name="mother"
            type="text"
            placeholder="mother"
            value={mother}
            required
            onChange={this.handleNewPerson}
          />

          <select
            name="mother"
            value={mother}
            onChange={this.handleNewPerson}
          >
            <option hidden>Selet Mother</option>
            {optionsOfMathers}
          </select>

          <button type="submit">Add New Person</button>
        </form>

        <p>
          Name:
          {name}
        </p>
        <p>
          Sex:
          {sex}
        </p>
        <p>
          Born:
          {born}
        </p>
        <p>
          Died:
          {died}
        </p>
        <p>
          Father:
          {father}
        </p>
        <p>
          Mother:
          {mother}
        </p>
      </div>
    );
  }
}

NewPerson.propTypes = {
  handleNewPersonSubmit: PropTypes.func.isRequired,
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewPerson;
