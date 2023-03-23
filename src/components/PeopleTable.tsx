import classNames from 'classnames';
import React from 'react';

import peopleFromServer from '../people.json';
import { Person } from '../types/Person';
import { Button } from './Button';

enum SortType {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  None = 'none',
}

type State = {
  people: Person[];
  selectedPeople: Person[];
  sortBy: SortType,
};

export class PeopleTable extends React.Component<{}, State> {
  state: Readonly<State> = {
    people: peopleFromServer,
    selectedPeople: [],
    sortBy: SortType.None,
  };

  selectPerson = (person: Person) => {
    this.setState((state) => ({
      selectedPeople: [...state.selectedPeople, person],
    }));
  };

  unselectPerson = (person: Person) => {
    this.setState((state) => ({
      selectedPeople: state.selectedPeople.filter(
        ({ slug }) => slug !== person.slug,
      ),
    }));
  }

  moveUp = (person: Person) => {
    this.setState((state) => {
      const { people } = state;
      const copy = [...people];

      const personIndex = people.findIndex(
        ({ slug }) => person.slug === slug,
      );

      if (!personIndex) {
        return {
          ...state,
        };
      }

      const prev = people[personIndex - 1];

      copy[personIndex - 1] = copy[personIndex];
      copy[personIndex] = prev;

      return {
        people: copy,
      };
    });
  }

  moveDown = (person: Person) => {
    this.setState((state) => {
      const { people } = state;
      const copy = [...people];

      const personIndex = people.findIndex(
        ({ slug }) => person.slug === slug,
      );

      if (personIndex >= people.length - 1) {
        return {
          ...state,
        };
      }

      const prev = people[personIndex + 1];

      copy[personIndex + 1] = copy[personIndex];
      copy[personIndex] = prev;

      return {
        people: copy,
      };
    });
  }

  getSorted = (people: Person[]) => {
    const copy = [...people];

    const { sortBy } = this.state;

    return copy.sort((prev, curr) => {
      switch (sortBy) {
        case SortType.Name:
        case SortType.Sex:
          return prev[sortBy].localeCompare(curr[sortBy]);

        case SortType.Born:
          return prev[sortBy] - curr[sortBy];

        default:
          return 0;
      }
    });
  }

  render() {
    const { people, selectedPeople } = this.state;

    const visiblePeople = this.getSorted(people);

    function isSelected(person: Person) {
      return selectedPeople.some(
        ({ slug }) => slug === person.slug,
      );
    }

    if (people.length === 0) {
      return <p>No people yet</p>;
    }

    const selectedPeopleNames = selectedPeople.length
      ? selectedPeople.map(({ name }) => name).join(', ')
      : '-';

    return (
      <table className="table is-striped is-narrow">
        <caption className="title is-5 has-text-info">
          {selectedPeopleNames}

          {selectedPeople.length > 0 && (
            <Button
              onClick={() => this.setState({ selectedPeople: [] })}
            >
              Clear
            </Button>
          )}
        </caption>

        <thead>
          <tr>
            <th> </th>
            <th
              onClick={() => this.setState({ sortBy: SortType.Name })}
            >
              name
            </th>
            <th
              onClick={() => this.setState({ sortBy: SortType.Sex })}
            >
              sex
            </th>
            <th
              onClick={() => this.setState({ sortBy: SortType.Born })}
            >
              born
            </th>
          </tr>
        </thead>

        <tbody>
          {visiblePeople.map(person => (
            <tr
              key={person.slug}
              className={classNames({
                'has-background-warning': isSelected(person),
              })}
            >
              <td>
                {isSelected(person) ? (
                  <Button
                    onClick={() => this.unselectPerson(person)}
                    className="is-small is-rounded is-danger"
                  >
                    <span className="icon is-small">
                      <i className="fas fa-minus" />
                    </span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => this.selectPerson(person)}
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

              <Button
                onClick={() => this.moveUp(person)}
              >
                &uarr;
              </Button>

              <Button
                onClick={() => this.moveDown(person)}
              >
                &darr;
              </Button>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
