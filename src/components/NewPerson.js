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

    if (name === 'name') {
      value = value.replace(/[^A-Za-z ]/, '');
    }

    if (name === 'born' && name === 'died') {
      value = value.replace(/[^0-9]/, '');
    }

    this.setState({
      [name]: value,
    });
  }

  getParrents = (parentSex, people, childBorn) => people
    .filter(parent => (
      parent.sex === parentSex && parent.born < childBorn))
    .map(parent => (
      <option
        key={parent.id + parent.name}
        value={parent.name}
      >
        {parent.name}
      </option>
    ))

  render() {
    const { people } = this.props;
    const { born } = this.state;
    const optionsOfFathers = this.getParrents('m', people, born);
    const optionsOfMathers = this.getParrents('f', people, born);

    return (
      <div>
        <form onSubmit={this.props.handleNewPersonSubmit}>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
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
            type="number"
            pattern="[0-9]{4}"
            placeholder="born year"
            required
            onChange={this.handleNewPerson}
          />

          <input
            name="died"
            type="number"
            pattern="[0-9]{4}"
            placeholder="died"
            required
            onChange={this.handleNewPerson}
          />

          <input
            name="father"
            type="text"
            placeholder="father"
            required
            value={this.state.father}
            onChange={this.handleNewPerson}
          />

          <select
            name="father"
            value={this.state.father}
            onChange={this.handleNewPerson}
          >
            {optionsOfFathers}
          </select>

          <input
            name="mother"
            type="text"
            placeholder="mother"
            value={this.state.mother}
            required
            onChange={this.handleNewPerson}
          />

          <select
            name="mother"
            value={this.state.mother}
            onChange={this.handleNewPerson}
          >
            {optionsOfMathers}
          </select>

          <button type="submit">Add New Person</button>
        </form>

        <p>
          Name:
          {this.state.name}
          {' '}

        </p>
        <p>
          Sex:
          {this.state.sex}
        </p>
        <p>
          Born:
          {this.state.born}
        </p>
        <p>
          Died:
          {this.state.died}
        </p>
        <p>
          Father:
          {this.state.father}
        </p>
        <p>
          Mother:
          {this.state.mother}
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
