import React from 'react';
import './NewPerson.scss';

class NewPerson extends React.Component { // Not working yet
  constructor(props) {
    super(props);
    this.state = {
      formControls: {

      },

    };
  }

  changeHandler = (event) => {
    const { name } = event.target;
    const { value } = event.target;

    this.setState({
      formControls: { [name]: value },
    });
  };

  handleSubmit = (event) => {
    // const form = event.target;

    // event.preventDefault();
    // this.props.onSubmit({
    //   name: form.element.name.value,
    //   sex: form.element.sex.value,
    //   born: form.element.born.value,
    //   died: form.element.died.value,
    //   mother: form.element.mother.value,
    //   father: form.element.father.value,
    // });
  };

  render() {
    const {
      name,
      sex,
      born,
      died,
      mother,
      father,
    } = this.state.formControls;

    return (
      <form className="newUser_form" onSubmit={this.handleSubmit}>
        <label htmlFor="name">
          Name
          <br />
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.changeHandler}
          />
        </label>
        <label htmlFor="sex">
          <input
            type="radio"
            name="sex"
            value={sex}
            onChange={this.changeHandler}
          />
          Male
          <input
            type="radio"
            name="sex"
            value={sex}
            onChange={this.changeHandler}
          />
          Female
        </label>
        <label htmlFor="born">
          Born
          <br />
          <input
            type="number"
            name="born"
            value={born}
            onChange={this.changeHandler}
          />
        </label>
        <label htmlFor="died">
          Died
          <br />
          <input
            type="number"
            name="died"
            value={died}
            onChange={this.changeHandler}
          />
        </label>
        <label htmlFor="mother">
          Mother
          <br />
          <input
            type="text"
            name="mother"
            value={mother}
            onChange={this.changeHandler}
          />
        </label>
        <label htmlFor="father">
          Father
          <br />
          <input
            type="text"
            name="father"
            value={father}
            onChange={this.changeHandler}
          />
        </label>
        <button type="submit" className="submitNewPerson">Create</button>
      </form>
    );
  }
}

export default NewPerson;
