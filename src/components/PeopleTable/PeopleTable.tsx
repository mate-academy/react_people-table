import React, { useState } from 'react';
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

export const PeopleTable: React.FC<{}> = () => {
  const [people, setPeople] = useState<Person[]>(peopleFromServer);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const [sortField, setSortField] = useState<SortField>(SortField.Null);

  const moveDown = (person: Person) => {
    setPeople(currentPeople => {
      const peopleCopy = [...currentPeople];

      const personIndex = peopleCopy.findIndex(
        personA => personA.slug === person.slug,
      );

      if (personIndex === peopleCopy.length - 1) {
        return currentPeople;
      }

      peopleCopy[personIndex + 1] = person;
      peopleCopy[personIndex] = currentPeople[personIndex + 1];

      return peopleCopy;
    });
  };

  const moveUp = (person: Person) => {
    setPeople(currentPeople => {
      const peopleCopy = [...currentPeople];

      const personIndex = peopleCopy.findIndex(
        personA => personA.slug === person.slug,
      );

      if (personIndex === 0) {
        return currentPeople;
      }

      peopleCopy[personIndex - 1] = person;
      peopleCopy[personIndex] = currentPeople[personIndex - 1];

      return peopleCopy;
    });
  };

  const selectPerson = (person: Person) => {
    setSelectedPeople(currentPeople => [...currentPeople, person]);
  };

  const unselectPerson = (person: Person) => {
    setSelectedPeople((currentPeople) => (
      currentPeople.filter(
        selectedPerson => selectedPerson.slug !== person.slug,
      )
    ));
  };

  const clearSelectedPeople = () => {
    setSelectedPeople([]);
  };

  const isPersonSelected = (person: Person) => {
   return selectedPeople.some(
      selectedPerson => selectedPerson.slug === person.slug,
    );
  };

  const visiblePeople = sortByField(people, sortField);

  if (people.length === 0) {
    return (
      <p>No people data yet</p>
    );
  }

  return (
    <table className="table is-striped is-narrow">
      <caption className="title is-5 has-text-info">
        {selectedPeople.length > 0 && (
          <button
            aria-label="Remove"
            type="button"
            className="delete"
            onClick={clearSelectedPeople}
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
              onClick={() => setSortField(SortField.Name)}
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
                    onClick={() => unselectPerson(person)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-minus" />
                    </span>
                  </Button>
                )
                : (
                  <Button
                    className="is-success"
                    onClick={() => selectPerson(person)}
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
                onClick={() => moveDown(person)}
              >
                &darr;
              </button>
            </td>

            <td>
              <button
                type="button"
                onClick={() => moveUp(person)}
              >
                &uarr;
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
