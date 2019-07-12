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
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
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
            type="type"
            pattern="[0-9]{4}"
            placeholder="born year"
            required
            minLength="4"
            maxLength="4"
            onChange={this.handleNewPerson}
          />

          <input
            name="died"
            type="type"
            pattern="[0-9]{4}"
            placeholder="died"
            required
            minLength="4"
            maxLength="4"
            onChange={this.handleNewPerson}
          />

          <input
            name="father"
            type="text"
            placeholder="father"
            required
            onChange={this.handleNewPerson}
          />

          <input
            name="mother"
            type="text"
            placeholder="mother"
            required
            onChange={this.handleNewPerson}
          />
          <button type="submit">Add New Person</button>
        </form>

        <p>
Name
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
died:
          {this.state.died}
        </p>
        <p>
father:
          {this.state.father}
        </p>
        <p>
mother:
          {this.state.mother}
        </p>

      </div>
    );
  }
}

NewPerson.propTypes = {
  handleNewPersonSubmit: PropTypes.func.isRequired,
};

export default NewPerson;
