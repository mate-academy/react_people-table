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
    selectedPeople: [
      peopleFromServer[2],
      peopleFromServer[24],
    ],
  };

  render() {
    const { people, selectedPeople } = this.state;

    if (people.length === 0) {
      return <p>No people yet</p>;
    }

    const setSelectedPerson = (person: Person | null) => {
      console.log(person);
      // this.setState({ selectedPeople: person });
    };

    const isPersonSelected = (person: Person) => {
      // return person.slug === selectedPerson?.slug;
      return selectedPeople.includes(person);
    };

    return (
      <table className="table is-striped is-narrow">
        <caption className="title is-5 has-text-info">
          {selectedPeople
            .map(person => person.name)
            .join(', ')}
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
                    onClick={() => setSelectedPerson(null)}
                    id={`remove-${person.slug}`}
                    className="is-small is-rounded is-danger"
                  >
                    <span className="icon is-small">
                      <i className="fas fa-minus" />
                    </span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => setSelectedPerson(person)}
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
