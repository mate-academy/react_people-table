import { useState } from 'react';
import classNames from 'classnames';

import peopleFromServer from '../people.json';
import { Person } from '../types/Person';
import { Button } from './Button';
import { SortLink } from './SortLink';

export const PeopleTableHooks = () => {
  const [people, setPeople] = useState<Person[]>(peopleFromServer);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const [sortField, setSortField] = useState<keyof Person | ''>('');
  const [isReversed, setReversed] = useState(false);
  const [query, setQuery] = useState('');
  const [sex, setSex] = useState('');

  if (people.length === 0) {
    return <p>No people yet</p>;
  }

  // #region methods
  function isSelected({ slug }: Person) {
    return selectedPeople.some(person => person.slug === slug);
  }

  const sortBy = (field: keyof Person) => {
    const isFirstClick = sortField !== field;
    const isSecondClick = sortField === field && !isReversed;

    setSortField(isFirstClick || isSecondClick ? field : '');
    setReversed(isSecondClick);
  };

  const selectPerson = (personToAdd: Person) => {
    setSelectedPeople(current => [...current, personToAdd]);
  };

  const unselectPerson = (personToDelete: Person) => {
    setSelectedPeople(current => current.filter(
      person => person.slug !== personToDelete.slug,
    ));
  };

  const clearSelection = () => {
    setSelectedPeople([]);
  };

  const moveUp = (personToMove: Person) => {
    setPeople(currentPeople => {
      const position = currentPeople.findIndex(
        person => person.slug === personToMove.slug,
      );

      if (position === 0) {
        return currentPeople;
      }

      return [
        ...currentPeople.slice(0, position - 1),
        currentPeople[position],
        currentPeople[position - 1],
        ...currentPeople.slice(position + 1),
      ];
    });
  };

  const moveDown = (personToMove: Person) => {
    setPeople(curentPeople => {
      const position = curentPeople.findIndex(
        person => person.slug === personToMove.slug,
      );

      if (position === curentPeople.length - 1) {
        return curentPeople;
      }

      const updatedPeople = [...curentPeople];

      updatedPeople[position] = curentPeople[position + 1];
      updatedPeople[position + 1] = curentPeople[position];

      return updatedPeople;
    });
  };
  // #endregion

  // #region visiblePeople
  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    const lowerQuery = query.toLocaleLowerCase();

    visiblePeople = visiblePeople.filter(person => {
      const stringToCheck = `
        ${person.name}
        ${person.motherName || ''}
        ${person.fatherName || ''}
      `;

      return stringToCheck
        .toLocaleLowerCase()
        .includes(lowerQuery);
    });
  }

  if (sortField) {
    visiblePeople.sort(
      (a, b) => {
        switch (sortField) {
          case 'name':
          case 'sex':
          case 'motherName':
          case 'fatherName': {
            const aValue = a[sortField] || '';
            const bValue = a[sortField] || '';

            return aValue.localeCompare(bValue);
          }

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
  // #endregion

  return (
    <table className="table is-striped is-narrow">
      <caption className="title is-5 has-text-info">
        <p className="block">
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
        </p>

        <div className="field has-addons">
          <div className="control has-icons-left is-expanded">
            <input
              className="input"
              type="search"
              placeholder="Search by name"
              onChange={e => setQuery(e.target.value)}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-search" />
            </span>
          </div>

          <div className="control">
            <div className="select">
              <select onChange={e => setSex(e.target.value)}>
                <option value="">All</option>
                <option value="f">Women</option>
                <option value="m">Men</option>
              </select>
            </div>
          </div>
        </div>
      </caption>

      <thead>
        <tr>
          <th> </th>
          <th>
            Name
            <SortLink
              isActive={sortField === 'name'}
              isReversed={isReversed}
              onClick={() => sortBy('name')}
            />
          </th>

          <th>
            Sex
            <SortLink
              isActive={sortField === 'sex'}
              isReversed={isReversed}
              onClick={() => sortBy('sex')}
            />
          </th>

          <th>
            Born
            <SortLink
              isActive={sortField === 'born'}
              isReversed={isReversed}
              onClick={() => sortBy('born')}
            />
          </th>

          <th>
            Mother
            <SortLink
              isActive={sortField === 'motherName'}
              isReversed={isReversed}
              onClick={() => sortBy('motherName')}
            />
          </th>

          <th>
            Father
            <SortLink
              isActive={sortField === 'fatherName'}
              isReversed={isReversed}
              onClick={() => sortBy('fatherName')}
            />
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
            <td>{person.motherName || ''}</td>
            <td>{person.fatherName || ''}</td>

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