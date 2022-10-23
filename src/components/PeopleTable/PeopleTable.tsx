import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { Button } from '../Button';
import peopleFromServer from '../../people.json';

enum SortField {
  Name = 'name',
  Slug = 'slug',
  Born = 'born',
  Died = 'died',
  Null = 'null',
}

type State = {
  selectedPeople: Person[];
  people: Person[];
  sortField: SortField;
};

function sortByField(items: Person[], field: SortField) {
  return [...items].sort((personA, personB) => {
    switch (field) {
      case SortField.Born:
      case SortField.Died:
        return personA[field] - personB[field];

      case SortField.Name:
      case SortField.Slug:
        return personA[field].localeCompare(personB[field]);

      default:
        return 0;
    }
  });
}

export class PeopleTable extends React.Component<{}, State> {
  state: Readonly<State> = {
    selectedPeople: [],
    people: peopleFromServer,
    sortField: SortField.Null,
  };

  moveDown = (person: Person) => {
    this.setState((state: State) => {
      const peopleCopy = [...state.people];

      const personIndex = peopleCopy.findIndex(
        personA => personA.slug === person.slug,
      );

      if (personIndex === peopleCopy.length - 1) {
        return null;
      }

      peopleCopy[personIndex + 1] = person;
      peopleCopy[personIndex] = state.people[personIndex + 1];

      return ({
        people: peopleCopy,
      });
    });
  };

  moveUp = (person: Person) => {
    this.setState((state: State) => {
      const peopleCopy = [...state.people];

      const personIndex = peopleCopy.findIndex(
        personA => personA.slug === person.slug,
      );

      if (personIndex === 0) {
        return null;
      }

      peopleCopy[personIndex - 1] = person;
      peopleCopy[personIndex] = state.people[personIndex - 1];

      return ({
        people: peopleCopy,
      });
    });
  };

  selectPerson = (person: Person) => {
    this.setState(({ selectedPeople }) => {
      const newSelectedPeople = [...selectedPeople, person];

      return ({
        selectedPeople: newSelectedPeople,
      });
    });
  };

  unselectPerson = (person: Person) => {
    this.setState(({ selectedPeople }) => ({
      selectedPeople: selectedPeople.filter(
        selectedPerson => selectedPerson.slug !== person.slug,
      ),
    }));
  };

  clearSelectedPeople = () => {
    this.setState({
      selectedPeople: [],
    });
  };

  setSortField = (sortField: SortField) => {
    this.setState({
      sortField,
    });
  }

  render() {
    const {
      selectedPeople,
      people,
      sortField,
    } = this.state;

    if (people.length === 0) {
      return (
        <p>No people data yet</p>
      );
    }

    function isPersonSelected(person: Person) {
      return selectedPeople.some(
        selectedPerson => selectedPerson.slug === person.slug,
      );
    }

    const visiblePeople = sortByField(people, sortField);

    return (
      <table className="table is-striped is-narrow">
        <caption className="title is-5 has-text-info">
          {selectedPeople.length > 0 && (
            <button
              aria-label="Remove"
              type="button"
              className="delete"
              onClick={this.clearSelectedPeople}
            />
          )}

          {selectedPeople.map(person => person.name).join(', ') || '-'}
        </caption>

        <thead>
          <tr>
            <th>select</th>
            <th>
              name

              <a
                href="#sort"
                onClick={() => this.setSortField(SortField.Name)}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </th>
            <th>sex</th>
            <th>born</th>
          </tr>
        </thead>

        <tbody>
          {visiblePeople.map(person => (
            <tr
              key={person.slug}
              className={classNames({
                'has-background-warning': isPersonSelected(person),
              })}
            >
              <td>
                {isPersonSelected(person)
                  ? (
                    <Button
                      className="is-danger"
                      onClick={() => this.unselectPerson(person)}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-minus" />
                      </span>
                    </Button>
                  )
                  : (
                    <Button
                      className="is-success"
                      onClick={() => this.selectPerson(person)}
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
              <td>
                <button
                  type="button"
                  onClick={() => this.moveDown(person)}
                >
                  &darr;
                </button>
              </td>

              <td>
                <button
                  type="button"
                  onClick={() => this.moveUp(person)}
                >
                  &uarr;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
