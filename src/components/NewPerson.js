import React from 'react';
// import PropTypes from 'prop-types';

import {
  Modal, Button, Form, Col,
} from 'react-bootstrap';

class NewPerson extends React.Component {
  constructor({ people }) {
    super({ people });

    this.state = {
      people,
      newPerson: {
        name: '',
        sex: '',
        died: 0,
        born: 0,
        mother: '',
        father: '',
      },
      show: false,
    };
    console.log(this.state.newPerson);
  }

  handleSubmit = (event) => {
  };

  handleChange = (event) => {
  }

  handleShow = () => this.setState({ show: true });

  handleClose = () => this.setState({ show: false });

  render() {
    // console.log(this.state.people);

    return (
      <>
        <Button
          variant="outline-info text-monospace"
          onClick={this.handleShow}
        >
          ✚ Add person
        </Button>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          onSubmit={this.handleSubmit}
        >
          <Modal.Header closeButton>
            <Modal.Title>✚ Add person</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Enter name"
                  onChange={this.handleChange}
                  name="mother"
                />
              </Form.Group>

              <Form.Group>
                <label htmlFor="male-Radio">
                  <input
                    onChange={this.handleChange}
                    name="sex"
                    type="radio"
                    value="m"
                    id="male-Radio"
                    required
                  />
                  <span className="male-radio">♂ Male</span>
                </label>
                {' / '}
                <label htmlFor="female-Radio">
                  <input
                    onChange={() => this.handleChange}
                    name="sex"
                    type="radio"
                    value="f"
                    id="female-Radio"
                    required
                  />
                  <span className="female-radio">♀ Female</span>
                </label>
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Born</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    placeholder="Date of birth"
                    value={this.state.born}
                    name="born"
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Died</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    placeholder="Date of death"
                    name="died"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Mother</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={this.handleChange}
                    name="mother"
                  >
                    <option value="none">choose a mother</option>
                    {this.state.people.map(person => (
                      <option value={person.mother}>{person.mother}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Father</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={this.handleChange}
                    name="mother"
                  >
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

export default NewPerson;
