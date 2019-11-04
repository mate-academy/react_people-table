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
      name: event.target.value,
    });
  };

  dateBornChange = (event) => {
    this.setState({
      bornDate: event.target.value,
    });
  };

  dateDeathChange = (event) => {
    this.setState({
      deathDate: event.target.value,
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

  getMotherOptions = (people) => {
    const { bornDate } = this.state;

    if (bornDate === null) {
      return;
    }

    return people.filter(person => (person.born < bornDate - 10 && person.died >= bornDate) && person.sex === 'f')
      .map(person => ({
        key: person.name,
        text: person.name,
        value: person.name,
      }));
  };

  getFatherOptions = (people) => {
    const { bornDate } = this.state;

    if (bornDate === null) {
      return;
    }

    return people.filter(person => (person.born < bornDate - 10 && person.died >= bornDate) && person.sex === 'm')
      .map(person => ({
        key: person.name,
        text: person.name,
        value: person.name,
      }));
  };

  onSubmit = (event) => {
    const { name, bornDate, deathDate, gender, mother, father, addNewPerson } = this.state;

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
    const motherOptions = this.getMotherOptions(people);
    const fatherOptions = this.getFatherOptions(people);


    return (
      showForm
        ? (
          <Form>
            <Form.Input fluid label="Full name" placeholder="Full name" value={name} onChange={this.nameChange} />
            <Form.Group widths="equal">
              <Form.Input fluid label="Year of born" placeholder="xxxx" value={bornDate} onChange={this.dateBornChange} />
              <Form.Input fluid label="Year of death" placeholder="xxxx" value={deathDate} onChange={this.dateDeathChange} />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select label="Mother" placeholder="Mother" options={motherOptions} onChange={this.motherChange} />
              <Form.Select label="Father" placeholder="Father" options={fatherOptions} onChange={this.fatherChange} />
            </Form.Group>
            <Form.Select placeholder="Gender" options={genderOptions} onChange={this.genderChange} />
            <Button className="option__item" onClick={this.onSubmit}>Add new person</Button>
          </Form>
        )
        : <Button className="option__item" onClick={this.buttonClick}>New Person</Button>
    );
  }
}

export default NewPerson;
