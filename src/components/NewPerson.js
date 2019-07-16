import React from 'react';
import PropTypes from 'prop-types';

class NewPerson extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    this.props.onSubmit({
      id: this.props.peopleAmmount + 1,
      name: form.elements.name.value,
      sex: form.elements.sex.value,
      born: form.elements.born.value,
      died: form.elements.died.value,
      children: form.elements.children.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Person's name"
          required
        />

        <label htmlFor="male-sex">
          <input
            id="male-sex"
            type="radio"
            name="sex"
            value="m"
          />
          Male
        </label>

        <label htmlFor="female-sex">
          <input
            id="female-sex"
            type="radio"
            name="sex"
            value="f"
          />
          Female
        </label>

        <input
          type="number"
          name="born"
          placeholder="Year of birth"
          required
        />

        <input
          type="number"
          name="died"
          placeholder="Year of death"
        />

        <input
          type="text"
          name="mother"
          placeholder="Person mother's name"
        />

        <input
          type="text"
          name="father"
          placeholder="Person father's name"
        />

        <input
          type="text"
          name="children"
          placeholder="Person children's names"
        />

        <button type="submit">Add</button>
      </form>
    );
  }
}

NewPerson.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  peopleAmmount: PropTypes.number.isRequired,
};

export default NewPerson;
