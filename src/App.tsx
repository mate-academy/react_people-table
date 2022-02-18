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
  query: string;
  sortBy: string;
};

function getPeople(): Promise<Person[]> {
  const API_URL = 'https://mate-academy.github.io/react_people-table/api';

  return fetch(`${API_URL}/people.json`).then((response) => response.json());
}

function getVisiblePeople(people: Person[], query: string, sortBy: string): Person[] {
  const lowerQuery = query.toLowerCase();
  const visiblePeople = people.filter(
    (person) => person.name.toLowerCase().includes(lowerQuery),
  );

  switch (sortBy) {
    case 'name':
      visiblePeople.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'born':
      visiblePeople.sort((a, b) => a.born - b.born);
      break;

    default:
  }

  return visiblePeople;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedPeople: [],
    people: [],
    query: '',
    sortBy: 'name',
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
    const {
      people, selectedPeople, query, sortBy,
    } = this.state;

    const visiblePeople = getVisiblePeople(people, query, sortBy);

    return (
      <div className="App">
        <h1>People table</h1>

        <input
          type="text"
          value={query}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({
              query: event.currentTarget.value,
            });
          }}
        />

        <button
          type="button"
          onClick={() => {
            this.setState({ sortBy: 'born' });
          }}
        >
          Sort by born
        </button>

        <button
          type="button"
          onClick={() => {}}
        >
          Sort by name
        </button>

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
            {visiblePeople.map((person) => (
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
                        this.setState((state) => ({
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
