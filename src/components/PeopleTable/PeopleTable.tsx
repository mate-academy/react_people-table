import React from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

import cn from 'classnames';

import peopleFromServer from '../../people.json';
import { Person } from '../../types/Person';
import { Button } from '../Button';
import { SortField } from '../../types/SortField';

type State = {
  people: Person[],
  selectedPeople: Person[],
  sortBy: SortField;
};

function getReorderedPeople(people: Person[], sortBy: SortField) {
  const peopleCopy = [...people];

  peopleCopy.sort((personA, personB) => {
    switch (sortBy) {
      case SortField.Name:
        return personA.name.localeCompare(personB.name);

      case SortField.Born:
        return personA.born - personB.born;

      case SortField.None:
      default:
        return 0;
    }
  });

  return peopleCopy;
}

export class PeopleTable extends React.Component<{}, State> {
  state: Readonly<State> = {
    people: [],
    selectedPeople: [],
    sortBy: SortField.None,
  };

  componentDidMount() {
    this.setState({
      people: peopleFromServer,
    });
  }

  selectPerson = (person: Person) => {
    this.setState((state) => ({
      selectedPeople: [...state.selectedPeople, person],
    }));
  };

  unselectPerson = (person: Person) => {
    this.setState((state) => ({
      selectedPeople: state.selectedPeople.filter(
        (selectedPerson) => selectedPerson.slug !== person.slug,
      ),
    }));
  }

  isPersonSelected = (person: Person) => {
    const {
      selectedPeople,
    } = this.state;

    return selectedPeople.some(
      selectedPerson => selectedPerson.slug === person.slug,
    );
  }

  clearSelectedPeople = () => {
    this.setState({
      selectedPeople: [],
    });
  }

  changeSortBy = (sortField: SortField) => {
    this.setState({
      sortBy: sortField,
    });
  }

  render() {
    const { people, selectedPeople, sortBy } = this.state;

    const visiblePeople = getReorderedPeople(people, sortBy);

    if (visiblePeople.length === 0) {
      return (
        <p>
          No people on server
        </p>
      );
    }

    return (
      <table className="table is-striped is-narrow">
        <caption className="title is-5">
          {selectedPeople.length > 0 && (
            <button
              aria-label="delete"
              type="button"
              className="delete"
              onClick={this.clearSelectedPeople}
            />
          )}

          {selectedPeople.map(person => person.name).join(', ') || '-'}
        </caption>

        <thead>
          <tr>
            <th>-</th>
            <th
              onClick={() => {
                this.changeSortBy(SortField.Name);
              }}
            >
              name
            </th>

            <th>sex</th>

            <th
              onClick={() => {
                this.changeSortBy(SortField.Born);
              }}
            >
              born
            </th>
          </tr>
        </thead>

        <tbody>
          {visiblePeople.map(person => {
            const isPersonSelected = this.isPersonSelected(person);

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
                          this.unselectPerson(person);
                        }}
                        className="is-small is-rounded is-danger"
                      >
                        <span className="icon is-small">
                          <i className="fas fa-minus" />
                        </span>
                      </Button>
                    )
                    : (
                      <Button
                        onClick={() => {
                          this.selectPerson(person);
                        }}
                        className="is-small is-rounded is-success"
                      >
                        <span className="icon is-small">
                          <i className="fas fa-plus" />
                        </span>
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
