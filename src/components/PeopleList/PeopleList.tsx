import React, { useState } from 'react';
import { Person } from '../../types/Person';
import peopleFromServer from '../../people.json';
import { SelectedPeople } from '../SelectedPeople';
import { PeopleTable } from '../PeopleTable';
import { SortField } from '../../types/SortFields';

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

export const PeopleList: React.FC<{}> = () => {
  const [people, setPeople] = useState<Person[]>(peopleFromServer);

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

  const selectionHandler = (personId: string) => {
    setPeople(currentPeople => (
      currentPeople.map(person => {
        if (person.id === personId) {
          return {
            ...person,
            selected: !person.selected,
          };
        }

        return person;
      })
    ));
  };

  const clearSelectedPeople = () => {
    setPeople(currentPeople => (
      currentPeople.map(person => ({
        ...person,
        selected: false,
      }))));
  };

  const sortPeople = (field: SortField) => {
    setPeople(currentPeople => (
      sortByField(currentPeople, field)
    ));
  };

  if (people.length === 0) {
    return (
      <p>No people data yet</p>
    );
  }

  return (
    <>
      <SelectedPeople
        people={people}
        clearSelectedPeople={clearSelectedPeople}
      />

      <PeopleTable
        people={people}
        moveDown={moveDown}
        moveUp={moveUp}
        selectionHandler={selectionHandler}
        sortPeople={sortPeople}
      />
    </>
  );
};
