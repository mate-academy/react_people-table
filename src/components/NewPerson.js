import React from 'react';
import './NewPerson.scss';

class NewPerson extends React.Component { // Not working yet
  constructor(props) {
    super(props);
    this.state = {
      formControls: {
        name: '',
        sex: '',
        born: '',
        died: '',
        century: '',
        mother: '',
        father: '',
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

  render() {
    return (
      <form className="newUser_form">
        <label htmlFor="name">
          Name
          <br />
          <input
            type="text"
            name="name"
            onChange={this.changeHandler}
            value={this.state.formControls.name.value}
          />
        </label>
        <label htmlFor="sex">
          <input
            type="radio"
            name="sex"
            value={this.state.formControls.sex.value}
            onChange={this.changeHandler}
          />
          Male
          <input
            type="radio"
            name="sex"
            value={this.state.formControls.sex.value}
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
            value={this.state.formControls.born}
            onChange={this.changeHandler}
          />
        </label>
        <label htmlFor="died">
          Died
          <br />
          <input
            type="number"
            name="died"
            value={this.state.formControls.died}
            onChange={this.changeHandler}
          />
        </label>
        <label htmlFor="age">
          Age
          <br />
          <input
            type="number"
            name="age"
            value={this.state.formControls.age}
            disabled
          />
        </label>
        <label htmlFor="century">
          Century
          <br />
          <input
            type="number"
            name="century"
            value={this.state.formControls.century}
            disabled
          />
        </label>
        <label htmlFor="mother">
          Mother
          <br />
          <input
            type="text"
            name="mother"
            value={this.state.formControls.mother}
            onChange={this.changeHandler}
          />
        </label>
        <label htmlFor="father">
          Father
          <br />
          <input
            type="text"
            name="father"
            value={this.state.formControls.father}
            onChange={this.changeHandler}
          />
        </label>
        <button type="submit" className="submitNewPerson">Create</button>
      </form>
    );
  }
}

export default NewPerson;
