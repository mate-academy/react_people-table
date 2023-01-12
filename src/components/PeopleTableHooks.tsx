/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import peopleFromServer from '../people.json';
import { Person } from '../types/Person';
import { Button } from './Button';

function preparePeople(
  people: Person[],
  sortField: keyof Person | null,
  isReversed: boolean,
) {
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

  if (isReversed) {
    sortedPeople.reverse();
  }

  return sortedPeople;
}

type Props = {};

export const PeopleTableHooks: React.FC<Props> = () => {
  const [people, setPeople] = useState<Person[]>(peopleFromServer);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const [sortField, setSortField] = useState<keyof Person | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    console.log(sortField, isReversed);

    return () => {
      console.log('before next effect call');
    };
  }, [isReversed, sortField]);
  // [null, false] - YES (run the first time)
  // [null, false] - NO (nothing changed in the array)
  // [null, true] - YES (2nd value has changes)

  if (people.length === 0) {
    return <p>No people yet</p>;
  }

  // #region Handlers

  const selectPerson = (personToSelect: Person) => {
    setSelectedPeople(current => [...current, personToSelect]);
  };

  const unselectPerson = (personToRemove: Person) => {
    setSelectedPeople(current => current.filter(
      person => person.slug !== personToRemove.slug,
    ));
  };

  const isPersonSelected = (personToCheck: Person) => {
    return selectedPeople.some(
      person => person.slug === personToCheck.slug,
    );
  };

  const clearSelection = () => {
    setSelectedPeople([]);
  };

  const moveUp = (position: number) => {
    if (position === 0) {
      return;
    }

    setPeople((previousPeople) => {
      const reorderedPeople = [...previousPeople];

      reorderedPeople[position] = previousPeople[position - 1];
      reorderedPeople[position - 1] = previousPeople[position];

      return reorderedPeople;
    });
  };

  const moveDown = (position: number) => {
    if (position === people.length - 1) {
      return;
    }

    setPeople(currentPeople => [
      ...currentPeople.slice(0, position),
      currentPeople[position + 1],
      currentPeople[position],
      ...currentPeople.slice(position + 2),
    ]);
  };

  // #endregion

  const sortBy = (field: keyof Person) => {
    // first click
    if (field !== sortField) {
      setSortField(field);
      setIsReversed(false);

      return;
    }

    // second click
    if (!isReversed) {
      setIsReversed(true);

      return;
    }

    // third click
    setSortField(null);
    setIsReversed(false);
  };

  const preparedPeople = preparePeople(people, sortField, isReversed);

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
          <th onClick={() => sortBy('name')}>
            name
            <a href="#sort-by-name">
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
          <th>sex</th>
          <th onClick={() => sortBy('born')}>
            born
            <a href="#sort-by-born">
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
        {preparedPeople.map((person, i) => (
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
};
