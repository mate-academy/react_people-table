import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';

import peopleFromServer from '../../people.json';
import { Person } from '../../types/Person';
import './PeopleTable.scss';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>(peopleFromServer);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState('');
  const [sex, setSex] = useState('');

  // region Methods
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
  // endregion

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  let visiblePeople = [...people];

  if (sex !== '') {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query !== '') {
    const normalizedQuery = query.toLocaleLowerCase();

    visiblePeople = visiblePeople.filter(person => {
      person.motherName?.toLocaleLowerCase(); // === null

      if (person.motherName) {
        person.motherName.toLocaleLowerCase();
      } else {
        return person.motherName;
      }


      const stringToCheck = `
        ${person.name}
        ${person.motherName || ''}
        ${person?.fatherName || ''}
      `;

      return stringToCheck.toLocaleLowerCase().includes(normalizedQuery);
    });
  }

  return (
    <table className="table is-striped is-narrow">
      <caption
        className="title is-5 has-text-info"
      >
        <p className="block">
          <button
            type="button"
            className="delete"
            onClick={clearSelectedPeople}
          >
            Clear all
          </button>
          {selectedPeople.map(person => person.name).join(', ')}
        </p>

        <div className="field has-addons">
          <div className="control has-icons-left is-expanded">
            <input
              type="search"
              className="input"
              placeholder="Search by name"
              onChange={handleInputChange}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-search" />
            </span>
          </div>

          <div className="control">
            <div className="select">
              <select onChange={(event) => setSex(event.target.value)}>
                <option value="">All</option>
                <option value="m">Men</option>
                <option value="f">Women</option>
              </select>
            </div>
          </div>
        </div>
      </caption>
      <thead>
        <tr>
          <th>-</th>
          <th>name</th>
          <th>Mother name</th>
          <th>Father name</th>
          <th>sex</th>
          <th>born</th>
          <th>reorder</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
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
                    className="button is-small is-rounded is-danger"
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
                    className="button is-small is-rounded is-success"
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

            <td>{person.motherName || '-'}</td>
            <td>{person.fatherName || '-'}</td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td className="is-flex is-flex-wrap-nowrap">
              <button
                type="button"
                onClick={() => handleMoveDown(person)}
                className="button mr-2"
              >
                &darr;
              </button>

              <button
                type="button"
                className="button"
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
};
