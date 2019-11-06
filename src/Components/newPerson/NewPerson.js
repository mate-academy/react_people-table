import React, {Component} from 'react';
import { Form, Button } from 'semantic-ui-react'

class NewPerson extends Component {
  state = {
    addNewPerson: this.props.addNewPerson,
    showForm: false,
    name: null,
    bornDate: null,
    deathDate: null,
    gender: null,
    mother: '',
    father: '',
  };

  buttonClick = (event) => {
    this.setState({
      showForm: true,
    });
  };

  getGenderOpinons = () => {
    return [
      { key: 'male', text: 'Male', value: 'male' },
      { key: 'female', text: 'Female', value: 'female' },
    ];
  };

  nameChange = (event) => {
    this.setState({
      name: event.target.value.replace(/[^a-z\s]/gi, ''),
    });
  };

  dateBornChange = (event) => {
    this.setState({
      bornDate: event.target.value.replace(/[^0-9]/g, ''),
    });
  };

  dateDeathChange = (event) => {
    this.setState({
      deathDate: event.target.value.replace(/[^0-9]/g, ''),
    });
  };

  motherChange = (event) => {
    this.setState({
      mother: event.target.textContent,
    });
  };

  fatherChange = (event) => {
    this.setState({
      father: event.target.textContent,
    });
  };

  genderChange = (event) => {
    this.setState({
      gender: event.target.textContent,
    });
  };

  getParentOptions = (people, gender) => {
    const { bornDate } = this.state;

    if (bornDate === null) {
      return;
    }

    return people.filter(person => (person.born < bornDate - 10 && person.died >= bornDate) && person.sex === gender)
      .map(person => ({
        key: person.name,
        text: person.name,
        value: person.name,
      }));
  };

  onSubmit = (event) => {
    const { name, bornDate, deathDate, gender, mother, father, addNewPerson } = this.state;

    if (!name || !bornDate || !gender) {
      return;
    }

    addNewPerson(name, bornDate, deathDate, gender === 'Male' ? 'm' : 'f', mother, father);

    this.setState({
      showForm: false,
      name: null,
      bornDate: null,
      deathDate: null,
      gender: null,
      mother: '',
      father: '',
    });
  };


  render() {
    const { showForm, name, bornDate, deathDate } = this.state;
    const { people } = this.props;
    const genderOptions = this.getGenderOpinons();
    const motherOptions = this.getMotherOptions(people, 'f');
    const fatherOptions = this.getFatherOptions(people, 'm');


    return (
      showForm
        ? (
          <Form onSubmit={this.onSubmit}>
            <Form.Input fluid label="Full name" placeholder="Full name" value={name} onChange={this.nameChange} />
            <Form.Group widths="equal">
              <Form.Input fluid label="Year of born" placeholder="xxxx" value={bornDate} maxLength="4" onChange={this.dateBornChange} />
              <Form.Input fluid label="Year of death" placeholder="xxxx" value={deathDate} maxLength="4" onChange={this.dateDeathChange} />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select label="Mother" placeholder="Mother" options={motherOptions} onChange={this.motherChange} />
              <Form.Select label="Father" placeholder="Father" options={fatherOptions} onChange={this.fatherChange} />
            </Form.Group>
            <Form.Select placeholder="Gender" options={genderOptions} onChange={this.genderChange} />
            <Button className="option__item">Add new person</Button>
          </Form>
        )
        : <Button className="option__item" onClick={this.buttonClick}>New Person</Button>
    );
  }
}

export default NewPerson;
