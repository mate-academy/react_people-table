import React from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

import cn from 'classnames';

import peopleFromServer from '../../people.json';
import { Person } from '../../types/Person';
import { Button } from '../Button';

type State = {
  people: Person[],
  selectedPerson: Person | null,
};

export class PeopleTable extends React.Component<{}, State> {
  state: Readonly<State> = {
    people: [],
    selectedPerson: null,
  };

  componentDidMount() {
    this.setState({
      people: peopleFromServer,
    });
  }

  selectPerson = (person: Person | null) => {
    this.setState({
      selectedPerson: person,
    });
  }

  render() {
    const { people, selectedPerson } = this.state;

    if (people.length === 0) {
      return (
        <p>
          No people on server
        </p>
      );
    }

    return (
      <table className="table is-striped is-narrow">
        <caption className="title is-5">
          {selectedPerson
            ? `${selectedPerson.name}`
            : 'No selected person'}
        </caption>

        <thead>
          <tr>
            <th>-</th>
            <th>name</th>
            <th>sex</th>
            <th>born</th>
          </tr>
        </thead>

        <tbody>
          {people.map(person => {
            const isPersonSelected = person.slug === selectedPerson?.slug;

            return (
              <tr
                key={person.slug}
                className={cn({
                  'has-background-warning': (
                    isPersonSelected
                  ),
                })}
              >
                <td>
                  {isPersonSelected
                    ? (
                      <Button
                        onClick={() => {
                          this.selectPerson(null);
                        }}
                        className="is-small"
                      >
                        -
                      </Button>
                    )
                    : (
                      <Button
                        onClick={() => {
                          this.selectPerson(person);
                        }}
                      >
                        +
                      </Button>
                    )}
                </td>
                <td
                  className={cn({
                    'has-text-link': person.sex === 'm',
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
