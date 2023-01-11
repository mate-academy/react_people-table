/* eslint-disable no-console */
import classNames from 'classnames';
import React from 'react';
import peopleFromServer from '../people.json';
import { Person } from '../types/Person';
import { Button } from './Button';

type State = {
  people: Person[];
  selectedPeople: Person[];
  sortField: keyof Person | null;
};

export class PeopleTable extends React.Component<{}, State> {
  state: State = {
    people: peopleFromServer,
    selectedPeople: [],
    sortField: null,
  };

  render() {
    const { people, selectedPeople, sortField } = this.state;

    if (people.length === 0) {
      return <p>No people yet</p>;
    }

    // #region Handlers

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

    const clearSelection = () => {
      this.setState({ selectedPeople: [] });
    };

    const moveUp = (position: number) => {
      if (position === 0) {
        return;
      }

      this.setState((state) => {
        const reorderedPeople = [...state.people];

        reorderedPeople[position] = state.people[position - 1];
        reorderedPeople[position - 1] = state.people[position];

        return { people: reorderedPeople };
      });
    };

    const moveDown = (position: number) => {
      if (position === people.length - 1) {
        return;
      }

      this.setState(state => ({
        people: [
          ...state.people.slice(0, position),
          state.people[position + 1],
          state.people[position],
          ...state.people.slice(position + 2),
        ],
      }));
    };

    const sortBy = (field: keyof Person) => {
      this.setState({ sortField: field });
    };

    // #endregion

    const sortedPeople = [...people];

    if (sortField) {
      sortedPeople.sort((person1, person2) => {
        switch (sortField) {
          case 'born':
            return person1.born - person2.born;

          case 'name':
            return person1.name.localeCompare(person2.name);

          default:
            return 0;
        }
      });
    }

    return (
      <table className="table is-striped is-narrow">
        <caption className="title is-5 has-text-info">
          {selectedPeople.length > 0 ? (
            <>
              {selectedPeople
                .map(person => person.name)
                .join(', ')}

              <button
                type="button"
                className="delete"
                onClick={clearSelection}
              >
                x
              </button>
            </>
          ) : '-'}
        </caption>

        <thead>
          <tr>
            <th>+</th>

            <th>
              name

              <a href="#sort-by-name" onClick={() => sortBy('name')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortField !== 'name',
                      'fa-sort-up': sortField === 'name',
                    })}
                  />
                </span>
              </a>
            </th>

            <th>sex</th>

            <th>
              born

              <a href="#sort-by-born" onClick={() => sortBy('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortField !== 'born',
                      'fa-sort-up': sortField === 'born',
                    })}
                  />
                </span>
              </a>
            </th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {sortedPeople.map((person, i) => (
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

              <td className="is-flex is-flex-wrap-nowrap">
                <Button onClick={() => moveDown(i)}>
                  &darr;
                </Button>

                <Button onClick={() => moveUp(i)}>
                  &uarr;
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
