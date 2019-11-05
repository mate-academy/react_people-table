import React from 'react';

import { Input } from 'semantic-ui-react';

import { getPeople } from './api/api';
import PeopleTable from './components/PeopleTable';
import Buttons from './components/Buttons';
import './app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      peopleToShow: null,
      selected: null,
      filtered: '',
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async() => {
    const people = await getPeople();

    this.setState({
      people: people.map((person, index) => ({
        ...person,
        id: index + 1,
        age: (+(person.died) - +(person.born)),
        century: Math.ceil(person.died / 100),
      })),
    });
  }

  selector = (id) => {
    this.setState(prevState => ({
      ...prevState,
      selected: id,
    }));
  };

  filter = (e) => {
    this.setState({ filtered: e.target.value });
  }

  sorter = (cell) => {
    let peopleToState;

    switch (cell) {
      case 'Name':
        peopleToState = this.state.people.filter((person) => {
          if (!person.name) {
            return '';
          }

          return (person.name.includes(this.state.filtered));
        }).sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Mother':
        peopleToState = this.state.people.filter((person) => {
          if (!person.mother) {
            return '';
          }

          return person.mother.includes(this.state.filtered);
        }).sort((a, b) => a.mother.localeCompare(b.mother));
        break;
      case 'Father':
        peopleToState = this.state.people.filter((person) => {
          if (!person.father) {
            return '';
          }

          return person.father.word.includes(this.state.filtered);
        }).sort((a, b) => a.father.localeCompare(b.father));
        break;
      case 'Id':
        peopleToState = this.state.people.sort((a, b) => a.id - b.id);
        break;
      case 'Sex':
        peopleToState = this.state.people.sort(
          (a, b) => a.sex.localeCompare(b.sex)
        );
        break;
      case 'Born':
        peopleToState = this.state.people.sort((a, b) => a.born - b.born);
        break;
      case 'Died':
        peopleToState = this.state.people.sort((a, b) => a.died - b.died);
        break;
      case 'Age':
        peopleToState = this.state.people.sort((a, b) => a.age - b.age);
        break;
      case 'Century':
        peopleToState = this.state.people.sort((a, b) => a.century - b.century);
        break;
      default:
        peopleToState = this.state.people;
        break;
    }

    this.setState(prevState => ({
      ...prevState,
      peopleToShow: peopleToState,
    }));
  }

  render() {
    const { people, peopleToShow } = this.state;

    return (
      <div className="App">
        <h1>People table</h1>
        <p>
          {people.length - 1}
          people found;
        </p>
        <Input
          type="text"
          placeholder="To filter!"
          onChange={this.filter}
          value={this.state.filtered}
        />
        <Buttons sorter={this.sorter} />
        <PeopleTable
          people={peopleToShow || people}
          selector={this.selector}
          props={this.state}
        />
      </div>
    );
  }
}

export default App;
