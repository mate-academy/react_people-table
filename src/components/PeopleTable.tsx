import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';

import peopleFromServer from '../people.json';
import { Person } from '../types/Person';
import { Button } from './Button';

type State = {
  people: Person[];
  selectedPeople: Person[];
  sortField: string;
  isReversed: boolean;
};

export class PeopleTable2 extends React.Component<{}, State> {
  state: Readonly<State> = {
    people: peopleFromServer,
    selectedPeople: [],
    sortField: '',
    isReversed: false,
  };

  sortBy = (field: string) => {
    this.setState(({ isReversed, sortField }) => {
      const isFirstClick = sortField !== field;
      const isSecondClick = sortField === field && !isReversed;

      return {
        sortField: isFirstClick || isSecondClick ? field : '',
        isReversed: isSecondClick,
      };
    });
  };

  selectPerson = (personToAdd: Person) => {
    this.setState(state => ({
      selectedPeople: [...state.selectedPeople, personToAdd],
    }));
  };

  unselectPerson = (personToDelete: Person) => {
    this.setState(state => ({
      selectedPeople: state.selectedPeople.filter(
        person => person.slug !== personToDelete.slug,
      ),
    }));
  };

  clearSelection = () => {
    this.setState({ selectedPeople: [] });
  };

  moveUp = (personToMove: Person) => {
    this.setState(({ people }) => {
      const position = people.findIndex(
        person => person.slug === personToMove.slug,
      );

      if (position === 0) {
        return null;
      }

      const updatedPeople = [
        ...people.slice(0, position - 1),
        people[position],
        people[position - 1],
        ...people.slice(position + 1),
      ];

      return { people: updatedPeople };
    });
  };

  moveDown = (personToMove: Person) => {
    this.setState(({ people }) => {
      const position = people.findIndex(
        person => person.slug === personToMove.slug,
      );

      if (position === people.length - 1) {
        return null;
      }

      const updatedPeople = [...people];

      updatedPeople[position] = people[position + 1];
      updatedPeople[position + 1] = people[position];

      return { people: updatedPeople };
    });
  };

  render() {
    const {
      people,
      selectedPeople,
      sortField,
      isReversed,
    } = this.state;

    function isSelected({ slug }: Person) {
      return selectedPeople.some(person => person.slug === slug);
    }

    if (people.length === 0) {
      return <p>No people yet</p>;
    }

    const visiblePeople = [...people];

    if (sortField) {
      visiblePeople.sort(
        (a, b) => {
          switch (sortField) {
            case 'name':
            case 'sex':
              return a[sortField].localeCompare(b[sortField]);

            case 'born':
              return a.born - b.born;

            default:
              return 0;
          }
        },
      );
    }

    if (isReversed) {
      visiblePeople.reverse();
    }

    return (
      <table className="table is-striped is-narrow">
        <caption className="title is-5 has-text-info">
          {selectedPeople.length === 0 ? '-' : (
            <>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                onClick={this.clearSelection}
              />
              <span>{selectedPeople.map(p => p.name).join(', ')}</span>
            </>
          )}
        </caption>

        <thead>
          <tr>
            <th> </th>
            <th>
              name
              <a href="#sort" onClick={() => this.sortBy('name')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortField !== 'name',
                      'fa-sort-up': sortField === 'name' && !isReversed,
                      'fa-sort-down': sortField === 'name' && isReversed,
                    })}
                  />
                </span>
              </a>
            </th>

            <th>
              sex
              <a href="#sort" onClick={() => this.sortBy('sex')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortField !== 'sex',
                      'fa-sort-up': sortField === 'sex' && !isReversed,
                      'fa-sort-down': sortField === 'sex' && isReversed,
                    })}
                  />
                </span>
              </a>
            </th>

            <th>
              born
              <a href="#sort" onClick={() => this.sortBy('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortField !== 'born',
                      'fa-sort-up': sortField === 'born' && !isReversed,
                      'fa-sort-down': sortField === 'born' && isReversed,
                    })}
                  />
                </span>
              </a>
            </th>

            <th> </th>
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

              <td className="is-flex is-flex-wrap-nowrap">
                <Button onClick={() => this.moveDown(person)}>
                  &darr;
                </Button>

                <Button onClick={() => this.moveUp(person)}>
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

export const PeopleTable: FC = () => {
  const [people, setPeople] = useState(peopleFromServer);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortBy = (field: string) => (
    setSortField((prevSortField) => {
      const isFirstClick = prevSortField !== field;
      let isSecondClick = false;

      setIsReversed((prevIsReversed) => {
        isSecondClick = prevSortField === field && !prevIsReversed;

        return isSecondClick;
      });

      return isFirstClick || isSecondClick ? field : '';
    })
  );

  const selectPerson = (personToAdd: Person) => {
    setSelectedPeople((prev) => ([...prev, personToAdd]));
  };

  const unselectPerson = (personToDelete: Person) => {
    setSelectedPeople((prev) => prev.filter(
      person => person.slug !== personToDelete.slug,
    ));
  };

  const clearSelection = () => {
    setSelectedPeople([]);
  };

  const moveUp = (personToMove: Person) => {
    setPeople((prev) => {
      const position = prev.findIndex(person => (
        person.slug === personToMove.slug
      ));

      if (position === 0) {
        return prev;
      }

      const peopleCopy = [...prev];
      const temp = peopleCopy[position];

      peopleCopy[position] = peopleCopy[position - 1];
      peopleCopy[position - 1] = temp;

      return peopleCopy;
    });
  };

  const moveDown = (personToMove: Person) => {
    setPeople((prev) => {
      const position = prev.findIndex(person => (
        person.slug === personToMove.slug
      ));

      if (position === prev.length - 1) {
        return prev;
      }

      const peopleCopy = [...prev];
      const temp = peopleCopy[position];

      peopleCopy[position] = peopleCopy[position + 1];
      peopleCopy[position + 1] = temp;

      return peopleCopy;
    });
  };

  const isSelected = ({ slug }: Person) => selectedPeople.some(person => (
    person.slug === slug
  ));

  if (people.length === 0) {
    return <p>No people yet</p>;
  }

  const visiblePeople = [...people];

  if (sortField) {
    visiblePeople.sort(
      (a, b) => {
        switch (sortField) {
          case 'name':
          case 'sex':
            return a[sortField].localeCompare(b[sortField]);

          case 'born':
            return a.born - b.born;

          default:
            return 0;
        }
      },
    );
  }

  if (isReversed) {
    visiblePeople.reverse();
  }

  return (
    <table className="table is-striped is-narrow">
      <caption className="title is-5 has-text-info">
        {selectedPeople.length === 0 ? '-' : (
          <>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              onClick={clearSelection}
            />
            <span>{selectedPeople.map(p => p.name).join(', ')}</span>
          </>
        )}
      </caption>

      <thead>
        <tr>
          <th> </th>
          <th>
            name
            <a href="#sort" onClick={() => sortBy('name')}>
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort': sortField !== 'name',
                    'fa-sort-up': sortField === 'name' && !isReversed,
                    'fa-sort-down': sortField === 'name' && isReversed,
                  })}
                />
              </span>
            </a>
          </th>

          <th>
            sex
            <a href="#sort" onClick={() => sortBy('sex')}>
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort': sortField !== 'sex',
                    'fa-sort-up': sortField === 'sex' && !isReversed,
                    'fa-sort-down': sortField === 'sex' && isReversed,
                  })}
                />
              </span>
            </a>
          </th>

          <th>
            born
            <a href="#sort" onClick={() => sortBy('born')}>
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort': sortField !== 'born',
                    'fa-sort-up': sortField === 'born' && !isReversed,
                    'fa-sort-down': sortField === 'born' && isReversed,
                  })}
                />
              </span>
            </a>
          </th>

          <th> </th>
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
              <Button onClick={() => moveDown(person)}>
                &darr;
              </Button>

              <Button onClick={() => moveUp(person)}>
                &uarr;
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
