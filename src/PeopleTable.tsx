import { useState } from 'react';
import classNames from 'classnames';
import { Person } from './types/Person';
import peopleFromServer from './people.json';

enum SortType {
  NONE = 'NONE',
  NAME = 'NAME',
  SEX = 'SEX',
  BORN = 'BORN',
}

export const PeopleTable: React.FC<{}> = () => {
  const [people, setPeople] = useState<Person[]>(peopleFromServer);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);

  const selectPerson = (person: Person) => {
    setSelectedPeople(currentSelectedPeople => [
      ...currentSelectedPeople,
      person,
    ]);
  };

  const unselectPerson = (personToUnselect: Person) => {
    setSelectedPeople(current => current.filter(
      person => person.slug !== personToUnselect.slug,
    ));
  };

  const clearSelection = () => {
    setSelectedPeople([]);
  };

  const moveUp = (personToMove: Person) => {
    setPeople(currentPeople => {
      const index = currentPeople.findIndex(person => person.slug === personToMove.slug);

      if (index === 0) {
        return currentPeople;
      }

      return [
        ...currentPeople.slice(0, index - 1),
        currentPeople[index],
        currentPeople[index - 1],
        ...currentPeople.slice(index + 1),
      ];
    });
  };

  const moveDown = (personToMove: Person) => {
    setPeople(currentPeople => {
      const index = currentPeople.findIndex(
        person => person.slug === personToMove.slug,
      );

      if (index === currentPeople.length - 1) {
        return currentPeople;
      }

      const newPeople = [...currentPeople];

      newPeople.splice(index, 1);
      newPeople.splice(index + 1, 0, personToMove);

      return newPeople;
    });
  };

  function isSelected(personToCheck: Person): boolean {
    return selectedPeople.some(
      person => person.slug === personToCheck.slug,
    );
  }

  const visiblePeople = [...people];

  switch (sortType) {
    case SortType.NAME:
      visiblePeople.sort(
        (a, b) => a.name.localeCompare(b.name),
      );
      break;

    case SortType.SEX:
      visiblePeople.sort(
        (a, b) => a.sex.localeCompare(b.sex),
      );
      break;

    case SortType.BORN:
      visiblePeople.sort(
        (a, b) => a.born - b.born,
      );
      break;

    default:
  }

  return (
    <table>
      <caption>
        <button type="button" onClick={clearSelection}>
          Clear
        </button>

        {selectedPeople
          .map(person => person.name)
          .join(', ')}
      </caption>
      <thead>
        <tr>
          <th> </th>
          <th onClick={() => setSortType(SortType.NAME)}>
            {' Name'}
          </th>
          <th onClick={() => setSortType(SortType.SEX)}>
            {' Sex'}
          </th>
          <th onClick={() => setSortType(SortType.BORN)}>
            {' Born'}
          </th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {visiblePeople.map(person => (
          <tr
            key={person.slug}
            className={classNames('Person', {
              'Person--selected': isSelected(person),
            })}
          >
            <td>
              {isSelected(person) ? (
                <button
                  type="button"
                  className="Person__select"
                  onClick={() => unselectPerson(person)}
                >
                  -
                </button>
              ) : (
                <button
                  type="button"
                  className="Person__remove"
                  onClick={() => selectPerson(person)}
                >
                  +
                </button>
              )}
            </td>

            <td>{person.name}</td>
            <td>{person.sex}</td>
            <td>{person.born}</td>

            <td>
              <button
                type="button"
                onClick={() => {
                  moveUp(person);
                  moveUp(person);
                  moveUp(person);
                }}
              >
                &uarr;
              </button>

              <button
                type="button"
                onClick={() => {
                  moveDown(person);
                  moveDown(person);
                  moveDown(person);
                }}
              >
                &darr;
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
