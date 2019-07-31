import React from 'react';
import './App.css';
import getPeople from './api/api';
import PeopleTable from './components/PeopleTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
    };
  }

  async componentDidMount() {
    await getPeople()
      .then((peopleData) => {
        this.setState(
          {
            people: [...peopleData].map((person, index) => ({
              id: index + 1,
              ...person,
              age: person.died - person.born,
              century: Math.ceil(person.died / 100),
              children: person.sex === 'm'
                ? [...peopleData].filter(child => child.father === person.name)
                : [...peopleData].filter(child => child.mother === person.name),
            })),
          },
        );
      });
  }

  render() {
    const { people } = this.state;

    return (
      <div className="App">
        {
          people.length ? (
            <PeopleTable peopleData={people} />
          ) : []
        }
      </div>
    );
  }
}

export default App;
