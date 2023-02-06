import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

import peopleFromServer from './people.json';
import { Person } from './types/Person';
import { Button } from './components/Button';

export const App = () => {
  const [people, setPeople] = useState<Person[]>(peopleFromServer);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const [sortField, setSortField] = useState<keyof Person | ''>('');
  const [isReversed, setReversed] = useState(false);
  const [query, setQuery] = useState('');
  const [sex, setSex] = useState('');

  if (people.length === 0) {
    return <p>No people yet</p>;
  }

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

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSex(event.target.value);
  };

  let visiblePeople = [...people];

  if (query) {
    const lowerQuery = query.toLowerCase();

    visiblePeople = visiblePeople.filter(person => {
      const stringToCheck = `
        ${person.name}
        ${person.fatherName || ''}
        ${person.motherName || ''}
      `;

      return stringToCheck.toLowerCase().includes(lowerQuery);
    });
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => (
      person.sex === sex
    ));
  }

  if (sortField) {
    visiblePeople.sort(
      (a, b) => {
        switch (sortField) {
          case 'name':
          case 'sex':
            return a[sortField].localeCompare(b[sortField]);

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
              onChange={handleInput}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-search" />
            </span>
          </div>
        </div>

        <select onChange={handleSelect}>
          <option value="">All</option>
          <option value="f">f</option>
          <option value="m">m</option>
        </select>
      </caption>

      <thead>
        <tr>
          <th> </th>
          <th>
            name
            <a href="#sort" onClick={() => sortBy('name')}>
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

          <th>
            sex
            <a href="#sort" onClick={() => sortBy('sex')}>
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort': sortField !== 'sex',
                    'fa-sort-up': sortField === 'sex' && !isReversed,
                    'fa-sort-down': sortField === 'sex' && isReversed,
                  })}
                />
              </span>
            </a>
          </th>

          <th>
            born
            <a href="#sort" onClick={() => sortBy('born')}>
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

          <th>
            mother
            <a href="#sort" onClick={() => sortBy('motherName')}>
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort': sortField !== 'motherName',
                    'fa-sort-up': sortField === 'motherName' && !isReversed,
                    'fa-sort-down': sortField === 'motherName' && isReversed,
                  })}
                />
              </span>
            </a>
          </th>

          <th>
            father
            <a href="#sort" onClick={() => sortBy('fatherName')}>
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort': sortField !== 'fatherName',
                    'fa-sort-up': sortField === 'fatherName' && !isReversed,
                    'fa-sort-down': sortField === 'fatherName' && isReversed,
                  })}
                />
              </span>
            </a>
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
