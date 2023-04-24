import classNames from 'classnames';
import { FC, useState } from 'react';

import peopleFromServer from '../people.json';
import { Person } from '../types/Person';
import { Button } from './Button';

export const PeopleTable: FC = () => {
  const [people, setPeople] = useState<Person[]>(peopleFromServer);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortBy = () => {
    // this.setState(({ isReversed, sortField }) => {
    //   const isFirstClick = sortField !== field;
    //   const isSecondClick = sortField === field && !isReversed;
    //
    //   return {
    //     sortField: isFirstClick || isSecondClick ? field : '',
    //     isReversed: isSecondClick,
    //   };
    // });
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

  const visiblePeople = [...people];

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
          </tr>
        ))}
      </tbody>
    </table>
  );
};
