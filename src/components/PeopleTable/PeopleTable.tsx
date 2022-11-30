import { useState } from 'react';
import classNames from 'classnames';

import peopleFromServer from '../../people.json';
import { Person } from '../../types/Person';
import './PeopleTable.scss';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>(peopleFromServer);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);

  const handlePersonSelection = (personToAdd: Person) => {
    setSelectedPeople((prevSelectedPeople) => ([
      ...prevSelectedPeople,
      personToAdd,
    ]));
  };

  const handlePersonUnselection = (personToRemove: Person) => {
    setSelectedPeople((prevSelectedPeople) => prevSelectedPeople
      .filter(
        person => person.slug !== personToRemove.slug,
      ));
  };

  const handleMoveDown = (personToMoveDown: Person) => {
    const peopleCopy = [...people];

    const personIndex = peopleCopy.findIndex(
      person => person.slug === personToMoveDown.slug,
    );

    if (personIndex === peopleCopy.length - 1) {
      return;
    }

    setPeople((prevPeople) => ([
      ...prevPeople.slice(0, personIndex),
      prevPeople[personIndex + 1],
      prevPeople[personIndex],
      ...prevPeople.slice(personIndex + 2),
    ]));
  };

  const handleMoveUp = (personToMoveDown: Person) => {
    const peopleCopy = [...people];

    const personIndex = peopleCopy.findIndex(
      person => person.slug === personToMoveDown.slug,
    );

    if (personIndex === 0) {
      return;
    }

    const swap = peopleCopy[personIndex];

    peopleCopy[personIndex] = peopleCopy[personIndex - 1];
    peopleCopy[personIndex - 1] = swap;

    setPeople(peopleCopy);
  };

  const isSelected = (personToCheck: Person) => {
    return selectedPeople.some(
      person => person.slug === personToCheck.slug,
    );
  };

  const clearSelectedPeople = () => {
    setSelectedPeople([]);
  };

  return (
    <table className="table is-striped is-narrow">
      <caption
        className="title is-5 has-text-info"
      >
        <button
          type="button"
          className="delete"
          onClick={clearSelectedPeople}
        >
          Clear all
        </button>
        {selectedPeople.map(person => person.name).join(', ')}
      </caption>
      <thead>
        <tr>
          <th>-</th>
          <th>name</th>
          <th>sex</th>
          <th>born</th>
          <th>reorder</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            className={classNames('Person', {
              'has-background-warning': isSelected(person),
            })}
          >
            <td>
              {isSelected(person)
                ? (
                  <button
                    type="button"
                    onClick={() => handlePersonUnselection(person)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-minus" />
                    </span>
                  </button>
                )
                : (
                  <button
                    type="button"
                    onClick={() => handlePersonSelection(person)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-plus" />
                    </span>
                  </button>
                )}
            </td>
            <td className={classNames({
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
                onClick={() => handleMoveDown(person)}
              >
                &darr;
              </button>

              <button
                type="button"
                onClick={() => handleMoveUp(person)}
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
