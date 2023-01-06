import classNames from 'classnames';
import React from 'react';
import peopleFromServer from '../people.json';
import { Person } from '../types/Person';
import { Button } from './Button';

type State = {
  people: Person[];
  selectedPerson: Person | null;
};

export class PeopleTable extends React.Component<{}, State> {
  state: State = {
    people: peopleFromServer,
    selectedPerson: null,
  };

  render() {
    const { people, selectedPerson } = this.state;

    if (people.length === 0) {
      return <p>No people yet</p>;
    }

    const setSelectedPerson = (person: Person | null) => {
      this.setState({ selectedPerson: person });
    };

    const isPersonSelected = (person: Person) => {
      return person.slug === selectedPerson?.slug;
    };

    return (
      <table className="table is-striped is-narrow">
        <caption className="title is-5 has-text-info">
          {selectedPerson?.name || '-'}
        </caption>

        <thead>
          <tr>
            <th>+</th>
            <th>name</th>
            <th>sex</th>
            <th>born</th>
          </tr>
        </thead>

        <tbody>
          {people.map(person => (
            <tr
              key={person.slug}
              className={classNames('Person', {
                'has-background-warning': isPersonSelected(person),
              })}
            >
              <td>
                {isPersonSelected(person) ? (
                  <Button
                    type="submit"
                    onClick={() => setSelectedPerson(null)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-minus" />
                    </span>
                  </Button>
                ) : (
                  <Button onClick={() => setSelectedPerson(person)}>
                    <span className="icon is-small">
                      <i className="fas fa-plus" />
                    </span>
                  </Button>
                )}
              </td>

              <td
                className={classNames({
                  'has-text-link': person.sex === 'm',
                  'has-text-danger': person.sex === 'f',
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
    );
  }
}
