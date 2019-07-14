import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal, Button, Form, Col,
} from 'react-bootstrap';

class NewPerson extends React.Component {
  constructor({ props, people }) {
    super({ props, people });

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      people,
      // person: people.map(person => ({
      //   ...person,
      // })),
      show: false,
    };
    // console.log(this.state.people);
  }

  handleName = (event) => {
    const { value } = event.target;
    this.setState({ name: value.trim() });
    console.log(value);
    console.log(this.state.name);
  };

  handleBorn = (event) => {
    const { value } = event.target;
    this.setState({ born: value.trim() });
    console.log(value);
    console.log(this.state.born);
  };

  handleDied = (event) => {
    const { value } = event.target;
    this.setState({ died: value.trim() });
    console.log(value);
    console.log(this.state.died);
  };

  handleSex = (event) => {
    const { value } = event.target;
    this.setState({ sex: value });
    console.log(value);
    console.log(this.state.sex);
  };

  handleMother = (event) => {
    const { value } = event.target;
    this.setState({ mother: value });
    console.log(value);
    console.log(this.state.mother);
  };

  handleFather = (event) => {
    const { value } = event.target;
    this.setState({ father: value });
    console.log(value);
    console.log(this.state.father);
  };

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    console.log(this.state.people);

    return (
      <>
        <Button variant="outline-info text-monospace" onClick={this.handleShow}>
          ✚ Add person
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>✚ Add person</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Enter name"
                  onChange={this.handleName}
                />
              </Form.Group>

              <Form.Group>
                <label htmlFor="male-Radio">
                  <input
                    onChange={this.handleSex}
                    name="sex"
                    type="radio"
                    value="m"
                    id="male-Radio"
                    required
                  />
                  ♂ Male
                </label>
                {'/'}
                <label htmlFor="female-Radio">
                  <input
                    onChange={this.handleSex}
                    name="sex"
                    type="radio"
                    value="f"
                    id="female-Radio"
                    required
                  />
                  ♀ Female
                </label>
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Born</Form.Label>
                  <Form.Control
                    onChange={this.handleBorn}
                    placeholder="Date of birth"
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Died</Form.Label>
                  <Form.Control
                    onChange={this.handleDied}
                    placeholder="Date of death"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Mother</Form.Label>
                  <Form.Control as="select" onChange={this.handleMother}>
                    <option value="none">choose a mother</option>
                    {this.state.people.map(person => (
                      <option value={person.mother}>{person.mother}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Father</Form.Label>
                  <Form.Control as="select" onChange={this.handleFather}>
                    <option value="none">choose a father</option>
                    {this.state.people.map(person => (
                      <option value={person.father}>{person.father}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="info" type="submit" onClick={this.handleClose}>
              ✚ Add person
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

this.props.propTypes = {
  props: PropTypes.func.isRequired,
};

this.people.propTypes = {
  people: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default NewPerson;
