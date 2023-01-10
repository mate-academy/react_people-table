/* eslint-disable no-console */
import classNames from 'classnames';
import React from 'react';
import peopleFromServer from '../people.json';
import { Person } from '../types/Person';
import { Button } from './Button';

type State = {
  people: Person[];
  selectedPeople: Person[];
};

export class PeopleTable extends React.Component<{}, State> {
  state: State = {
    people: peopleFromServer,
    selectedPeople: [],
  };

  render() {
    const { people, selectedPeople } = this.state;

    if (people.length === 0) {
      return <p>No people yet</p>;
    }

    const selectPerson = (personToSelect: Person) => {
      this.setState((state) => ({
        selectedPeople: [...state.selectedPeople, personToSelect],
      }));
    };

    const unselectPerson = (personToRemove: Person) => {
      this.setState((state) => ({
        selectedPeople: state.selectedPeople.filter(
          person => person.slug !== personToRemove.slug,
        ),
      }));
    };

    const isPersonSelected = (personToCheck: Person) => {
      // return person.slug === selectedPerson?.slug;
      // return selectedPeople.includes(person);
      return selectedPeople.some(
        person => person.slug === personToCheck.slug,
      );
    };

    return (
      <table className="table is-striped is-narrow">
        <caption className="title is-5 has-text-info">
          {selectedPeople
            .map(person => person.name)
            .join(', ') || '-'}
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
              className={classNames({
                'has-background-warning': isPersonSelected(person),
              })}
            >
              <td>
                {isPersonSelected(person) ? (
                  <Button
                    onClick={() => unselectPerson(person)}
                    id={`remove-${person.slug}`}
                    className="is-small is-rounded is-danger"
                  >
                    <span className="icon is-small">
                      <i className="fas fa-minus" />
                    </span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => selectPerson(person)}
                    className="is-small is-rounded is-success"
                  >
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
