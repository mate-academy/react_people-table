import React from 'react';
import { Person } from './types/Person';
import { Loader } from './components/Loader';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import peopleFromServer from './people.json';

type State = {
  isDataLoaded: boolean;
  people: Person[];
};

export class App extends React.Component<{}, State> {
  state: State = {
    isDataLoaded: false,
    people: [],
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isDataLoaded: true,
        people: peopleFromServer,
      });
    }, 500);
  }

  render() {
    const { people, isDataLoaded } = this.state;

    return (
      <div className="box">
        <h1 className="title">People table</h1>

        {!isDataLoaded && (
          <Loader />
        )}

        {isDataLoaded && people.length === 0 && (
          <p>No people yet</p>
        )}

        {isDataLoaded && people.length > 0 && (
          <table className="table is-striped is-narrow">
            <thead>
              <tr>
                <th>name</th>
                <th>sex</th>
                <th>born</th>
              </tr>
            </thead>

            <tbody>
              {people.map(person => (
                <tr key={person.slug}>
                  <td>{person.name}</td>
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
