/* eslint-disable no-console */
import React from 'react';

import './App.scss';

interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}

type State = {
  selectedPeople: Person[];
  people: Person[];
};

function getPeople(): Promise<Person[]> {
  const API_URL = 'https://mate-academy.github.io/react_people-table/api';

  return fetch(`${API_URL}/people.json`).then((response) => response.json());
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedPeople: [],
    people: [],
  };

  componentDidMount() {
    const promise = getPeople();

    promise.then((peopleFromServer) => {
      this.setState({
        people: peopleFromServer,
      });
    });
  }

  render() {
    const { people, selectedPeople } = this.state;

    return (
      <div className="App">
        <h1>People table</h1>

        <table>
          <thead>
            <tr>
              <th>.</th>
              <th>Sex</th>
              <th>Name</th>
              <th>Born</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.slug}>
                <td>
                  {selectedPeople.some((selectedPerson) => selectedPerson.slug === person.slug) ? (
                    <button
                      type="button"
                      onClick={() => {
                        this.setState({
                          selectedPeople: selectedPeople.filter(
                            (selectedPerson) => selectedPerson.slug !== person.slug,
                          ),
                        });
                      }}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        this.setState(state => ({
                          selectedPeople: [...state.selectedPeople, person],
                        }));
                      }}
                    >
                      Add
                    </button>
                  )}
                </td>
                <td>{person.sex}</td>
                <td>{person.name}</td>
                <td>{person.born}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
