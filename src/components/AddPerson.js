import React from 'react';

class AddPerson extends React.Component {

  constructor() {
    super();
    this.state = {
      firstName: '',
      age: '',
      sex: 'male',
      born: '',
      died: '',
      mother: '',
      father: '',
      century: '',
      children: '',
      isLoaded: false,
      isLoading: false,
    }
    this.handleChange = this.handleChange.bind(this);
  }
  // age, sex, born, died, mother, father, century, children,

  handleChange(event) {

    const { name, value, type, checked, born, died, mother, father, century, children } = event.target;

    this.setState({
      [name]: value,
      [born]: value,
      [died]: value,
      [mother]: value,
      [father]: value,
      [century]: value,
      [children]: value,
    });
    type === 'checkbox'
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });

    setTimeout(() => {
      this.setState({
        isLoaded: true,
        isLoading: false,
      });
    }, 500);

  }

  render() {
    // if (!this.state.isLoaded) {
    //   return (
    //     <button
    //       type="submit"
    //       className="btn btn-success mt-5"
    //       onClick={this.handleChange}
    //       disabled={this.state.isLoading}
    //     >
    //       {this.state.isLoading ? 'Loading...' : 'Add person' }
    //     </button>
    //   );
    // }
    return (
      <form>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary">
            <input
              type="text"
              value={this.state.firstName}
              name="firstName"
              placeholder="First Name"
              onChange={this.handleChange}
              className="form-control"
            />
          </label>
          <br/>
            <label className="btn btn-secondary active">
              <input
                  type="radio"
                  name="sex"
                  value="male"
                  checked={this.state.sex === 'male'}
                  onChange={this.handleChange}
              /> Male
            </label>
          <label className="btn btn-secondary">
            <input
                type="radio"
                name="sex"
                value="female"
                checked={this.state.sex === 'female'}
                onChange={this.handleChange}
            /> Female
          </label>
          <label className="btn btn-secondary">
            <input
                type="text"
                value={this.state.born}
                name="born"
                placeholder="born"
                onChange={this.handleChange}
                className="form-control"
            />
          </label>
          <label className="btn btn-secondary">
            <input
                type="text"
                value={this.state.died}
                name="died"
                placeholder="died"
                onChange={this.handleChange}
                className="form-control"
            />
          </label>
          <label className="btn btn-secondary">
            <input
                type="text"
                value={this.state.mother}
                name="mother"
                placeholder="mother"
                onChange={this.handleChange}
                className="form-control"
            />
          </label>
          <label className="btn btn-secondary">
            <input
                type="text"
                value={this.state.father}
                name="father"
                placeholder="father"
                onChange={this.handleChange}
                className="form-control"
            />
          </label>
          <label className="btn btn-secondary">
            <input
                type="text"
                value={this.state.century}
                name="century"
                placeholder="century"
                onChange={this.handleChange}
                className="form-control"
            />
          </label>
          <label className="btn btn-secondary">
            <input
                type="text"
                value={this.state.age}
                name="age"
                placeholder="age"
                onChange={this.handleChange}
                className="form-control"
            />
          </label>
          <label className="btn btn-secondary">
            <input
                type="text"
                value={this.state.children}
                name="children"
                placeholder="children"
                onChange={this.handleChange}
                className="form-control"
            />
          </label>
            <button
                type="button"
                value={this.state.children}
                name="children"
                placeholder="children"
                className="btn btn-warning"
            >add
        </button>
        </div>

        <h1>Full name: {this.state.firstName}</h1>
        <h2>You are a {this.state.sex}</h2>
        <h2>Born {this.state.born}</h2>
        <h2>Died {this.state.died}</h2>
        <h2>mother {this.state.mother}</h2>
        <h2>father {this.state.father}</h2>
        <h2>century {this.state.century}</h2>
        <h2>Age: {(this.state.age)}</h2>

        <h2>children {this.state.children}</h2>
      </form>
    );
  }
}

export default AddPerson;
