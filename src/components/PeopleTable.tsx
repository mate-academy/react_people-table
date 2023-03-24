import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import peopleFromServer from '../people.json';
import { Person } from '../types/Person';
import { Button } from './Button';

enum SortType {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  None = 'none',
}

const getSorted = (people: Person[], sortBy: SortType) => {
  const copy = [...people];

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
};

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>(peopleFromServer);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const [sortBy, setSortBy] = useState(SortType.None);

  useEffect(() => {
    const visiblePeople = getSorted(people, sortBy);

    setPeople(visiblePeople);
  }, [sortBy]);

  const selectPerson = (person: Person) => {
    setSelectedPeople((prevSelectedPeople) => [
      ...prevSelectedPeople, person,
    ]);
  };

  const unselectPerson = (person: Person) => {
    setSelectedPeople((prevSelectedPeople) => (
      prevSelectedPeople.filter(
        ({ slug }) => slug !== person.slug,
      )
    ));
  };

  const moveUp = (person: Person) => {
    setPeople((currentPeople) => {
      const copy = [...currentPeople];

      const personIndex = currentPeople.findIndex(
        ({ slug }) => person.slug === slug,
      );

      if (!personIndex) {
        return currentPeople;
      }

      const prev = currentPeople[personIndex - 1];

      copy[personIndex - 1] = copy[personIndex];
      copy[personIndex] = prev;

      return copy;
    });
  };

  const moveDown = (person: Person) => {
    setPeople((currentPeople) => {
      const copy = [...currentPeople];

      const personIndex = currentPeople.findIndex(
        ({ slug }) => person.slug === slug,
      );

      if (personIndex >= currentPeople.length - 1) {
        return currentPeople;
      }

      const prev = currentPeople[personIndex + 1];

      copy[personIndex + 1] = copy[personIndex];
      copy[personIndex] = prev;

      return copy;
    });
  };

  const isSelected = (person: Person) => {
    return selectedPeople.some(
      ({ slug }) => slug === person.slug,
    );
  };

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
            onClick={() => setSelectedPeople([])}
          >
            Clear
          </Button>
        )}
      </caption>

      <thead>
        <tr>
          <th> </th>
          <th
            onClick={() => setSortBy(SortType.Name)}
          >
            name
          </th>
          <th
            onClick={() => setSortBy(SortType.Sex)}
          >
            sex
          </th>
          <th
            onClick={() => setSortBy(SortType.Born)}
          >
            born
          </th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
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

            <Button
              onClick={() => moveUp(person)}
            >
              &uarr;
            </Button>

            <Button
              onClick={() => moveDown(person)}
            >
              &darr;
            </Button>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
