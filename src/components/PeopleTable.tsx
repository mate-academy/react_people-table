import classNames from 'classnames';
import { FC, useState, ChangeEvent } from 'react';

import peopleFromServer from '../people.json';
import { Person, SortByOption } from '../types/Person';
import { Button } from './Button';
import { SortLink } from './SortLink';

export const PeopleTable: FC = () => {
  const [people, setPeople] = useState<Person[]>(peopleFromServer);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState('');
  const [selectedSex, setSelectedSex] = useState('');
  const [sortField, setSortField] = useState<SortByOption | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const sortBy = (columnName: SortByOption) => {
    const isFirstClick = sortField !== columnName;
    const isSecondClick = !isFirstClick && !isReversed;

    setSortField(isFirstClick || isSecondClick ? columnName : null);
    setIsReversed(isSecondClick);
  };

  const resetSorting = () => {
    setSortField(null);
    setIsReversed(false);
  };

  const selectPerson = (personToAdd: Person) => {
    setSelectedPeople((current) => ([
      ...current,
      personToAdd,
    ]));
  };

  const unselectPerson = (personToDelete: Person) => {
    setSelectedPeople((currentSelectedPeople) => {
      return currentSelectedPeople.filter(
        person => person.slug !== personToDelete.slug,
      );
    });
  };

  const clearSelection = () => {
    setSelectedPeople([]);
  };

  const isSelected = ({ slug }: Person) => {
    return selectedPeople.some(person => person.slug === slug);
  };

  if (people.length === 0) {
    return <p>No people yet</p>;
  }

  const moveDown = (personToMove: Person) => {
    resetSorting();

    setPeople((currentPeople) => {
      const personIndex = currentPeople
        .findIndex(({ slug }) => slug === personToMove.slug);

      if (personIndex === currentPeople.length - 1) {
        return currentPeople;
      }

      const newPeople = [...currentPeople];

      newPeople[personIndex] = currentPeople[personIndex + 1];
      newPeople[personIndex + 1] = currentPeople[personIndex];

      return newPeople;
    });
  };

  const moveUp = (personToMove: Person) => {
    resetSorting();

    setPeople((currentPeople) => {
      const personIndex = currentPeople
        .findIndex(({ slug }) => slug === personToMove.slug);

      if (personIndex === 0) {
        return currentPeople;
      }

      const newPeople = [...currentPeople];

      newPeople[personIndex] = currentPeople[personIndex - 1];
      newPeople[personIndex - 1] = currentPeople[personIndex];

      return newPeople;
    });
  };

  let visiblePeople = [...people];

  if (query) {
    visiblePeople = visiblePeople.filter((person) => {
      const lowerQuery = query.toLowerCase();

      return person.name.toLowerCase().includes(lowerQuery)
       || person.motherName?.toLowerCase().includes(lowerQuery)
       || person.fatherName?.toLowerCase().includes(lowerQuery);
    });
  }

  visiblePeople = (selectedSex === 'm' || selectedSex === 'f')
    ? visiblePeople.filter((person) => person.sex === selectedSex)
    : visiblePeople;

  if (sortField) {
    visiblePeople.sort(
      (firstPerson, secondPerson) => {
        switch (sortField) {
          case SortByOption.Name:
          case SortByOption.Sex:
          case SortByOption.MotherName:
          case SortByOption.FatherName: {
            const aValue = firstPerson[sortField] || '';
            const bValue = secondPerson[sortField] || '';

            return aValue.localeCompare(bValue);
          }

          case SortByOption.Born:
            return firstPerson.born - secondPerson.born;

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

        <div className="field has-addons">
          <div className="control has-icons-left is-expanded">
            <input
              className="input"
              type="search"
              placeholder="Search by name"
              value={query}
              onChange={handleQueryChange}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-search" />
            </span>
          </div>

          <div className="control">
            <div className="select">
              <select
                value={selectedSex}
                onChange={(event) => setSelectedSex(event.target.value)}
              >
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
            name
            <SortLink
              onClickCallback={() => sortBy(SortByOption.Name)}
              isActive={sortField === SortByOption.Name}
              isReversed={isReversed}
            />
          </th>

          <th>
            sex
            <SortLink
              onClickCallback={() => sortBy(SortByOption.Sex)}
              isActive={sortField === SortByOption.Sex}
              isReversed={isReversed}
            />
          </th>

          <th>
            born
            <SortLink
              onClickCallback={() => sortBy(SortByOption.Born)}
              isActive={sortField === SortByOption.Born}
              isReversed={isReversed}
            />
          </th>

          <th> </th>

          <th>
            Mother Name
            <SortLink
              onClickCallback={() => sortBy(SortByOption.MotherName)}
              isActive={sortField === SortByOption.MotherName}
              isReversed={isReversed}
            />
          </th>

          <th>
            Father Name
            <SortLink
              onClickCallback={() => sortBy(SortByOption.FatherName)}
              isActive={sortField === SortByOption.FatherName}
              isReversed={isReversed}
            />
          </th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map((person, index) => (
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
              <Button
                onClick={() => moveDown(person)}
                disabled={index === visiblePeople.length - 1}
              >
                &darr;
              </Button>

              <Button
                onClick={() => moveUp(person)}
                disabled={index === 0}
              >
                &uarr;
              </Button>
            </td>

            <td>{person.motherName || ''}</td>
            <td>{person.fatherName || ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
