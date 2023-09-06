import React from 'react';
import cn from 'classnames';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import { Person } from './types/Person';
import { Loader } from './components/Loader';

type State = {
  loading: boolean;
  people: Person[];
  selectedPeople: Person[];
};

export class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    loading: true,
    people: [],
    selectedPeople: [],
  };

  componentDidMount(): void {
    fetch('http://localhost:3000/api/people.json')
      .then(response => response.json())
      .then(peopleFromServer => {
        this.setState({
          people: peopleFromServer,
          loading: false,
        });
      });
  }

  render() {
    const { people, loading, selectedPeople } = this.state;

    function isSelected(personToCheck: Person) {
      return selectedPeople.some(person => person.slug === personToCheck.slug);
    }

    const remove = (personToRemove: Person) => {
      this.setState((currentState) => ({
        selectedPeople: currentState.selectedPeople.filter(
          person => person !== personToRemove,
        ),
      }));
    };

    const add = (personToAdd: Person) => {
      this.setState(state => ({
        selectedPeople: [...state.selectedPeople, personToAdd],
      }));
    };

    return (
      <div className="box">
        <h1 className="title">People table</h1>

        {loading ? <Loader /> : (
          <table className="table is-striped is-narrow">
            <caption className="title is-5 has-text-info">
              {selectedPeople.map(person => person.name).join(', ') || '---'}
            </caption>

            <thead>
              <tr>
                <th> </th>
                <th>name</th>
                <th>sex</th>
                <th>born</th>
              </tr>
            </thead>

            <tbody>
              {people.map(person => (
                <tr
                  key={person.slug}
                  className={cn({
                    'has-background-warning': isSelected(person),
                  })}
                >
                  <td>
                    {isSelected(person) ? (
                      <button
                        type="button"
                        className="button is-small is-rounded is-danger"
                        onClick={() => remove(person)}
                      >
                        <span className="icon is-small">
                          <i className="fas fa-minus" />
                        </span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="button is-small is-success"
                        onClick={() => add(person)}
                      >
                        <span className="icon is-small">
                          <i className="fas fa-plus" />
                        </span>
                      </button>
                    )}
                  </td>

                  <td
                    className={cn({
                      'has-text-danger': person.sex === 'f',
                      'has-text-info': person.sex === 'm',
                    })}
                  >
                    {person.name}
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
