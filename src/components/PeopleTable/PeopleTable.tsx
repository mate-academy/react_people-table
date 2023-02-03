import React, { useEffect, useState } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

import cn from 'classnames';
import peopleFromServer from '../../people.json';
import { Person } from '../../types/Person';
import { Button } from '../Button';
import { SortField } from '../../types/SortField';

function getReorderedPeople(
  people: Person[],
  sortBy: SortField,
  isReversed: boolean,
) {
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

  if (isReversed) {
    peopleCopy.reverse();
  }

  return peopleCopy;
}

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const [sortBy, setSortBy] = useState(SortField.None);
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    setPeople(peopleFromServer);
  }, []);

  const selectPerson = (person: Person) => {
    setSelectedPeople((currentSelectedPeople) => (
      [...currentSelectedPeople, person]
    ));
  };

  const unselectPerson = (person: Person) => {
    setSelectedPeople((currentSelectedPeople) => (
      currentSelectedPeople.filter(
        (selectedPerson) => selectedPerson.slug !== person.slug,
      )));
  };

  const isSelected = (person: Person) => {
    return selectedPeople.some(
      selectedPerson => selectedPerson.slug === person.slug,
    );
  };

  const changeSortType = (newSortBy: SortField) => {
    const isAlreadySorted = sortBy === newSortBy;

    if (isAlreadySorted) {
      setIsReversed((currentIsReversed) => !currentIsReversed);
    } else {
      setIsReversed(false);
      setSortBy(newSortBy);
    }
  };

  const visiblePeople = getReorderedPeople(people, sortBy, isReversed);

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
            onClick={() => {
              setSelectedPeople([]);
            }}
          />
        )}

        {selectedPeople.map(person => person.name).join(', ') || '-'}
      </caption>

      <thead>
        <tr>
          <th>-</th>
          <th>
            <span>name</span>
            <a
              href="#sort"
              className="icon"
              onClick={() => {
                changeSortType(SortField.Name);
              }}
            >
              <i
                className={cn('fas', {
                  'fa-sort': sortBy !== SortField.Name,
                  'fa-sort-up': sortBy === SortField.Name && !isReversed,
                  'fa-sort-down': sortBy === SortField.Name && isReversed,
                })}
              />
            </a>
          </th>

          <th>sex</th>

          <th>
            <span>born</span>
            <a
              href="#sort"
              className="icon"
              onClick={() => {
                changeSortType(SortField.Born);
              }}
            >
              <i
                className={cn('fas', {
                  'fa-sort': sortBy !== SortField.Born,
                  'fa-sort-up': sortBy === SortField.Born && !isReversed,
                  'fa-sort-down': sortBy === SortField.Born && isReversed,
                })}
              />
            </a>
          </th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          const isPersonSelected = isSelected(person);

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
                        unselectPerson(person);
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
                        selectPerson(person);
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
};
