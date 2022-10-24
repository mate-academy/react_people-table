import React from 'react';
import cn from 'classnames';
import { Button } from '../Button';
import { Person } from '../../types/Person';
import { SortField } from '../../types/SortFields';

type Props = {
  people: Person[];
  moveDown: (person: Person) => void;
  moveUp: (person: Person) => void;
  selectionHandler: (personId: string) => void;
  sortPeople: (field: SortField) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  moveDown,
  moveUp,
  selectionHandler,
  sortPeople,
}) => (
  <table className="table is-striped is-narrow">
    <thead>
      <tr>
        <th>select</th>
        <th>
          name

          <a
            href="#sort"
            onClick={() => sortPeople(SortField.Name)}
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
      {people.map(person => (
        <tr
          key={person.slug}
          className={cn({
            'has-background-warning': person.selected,
          })}
        >
          <td>
            <Button
              className={cn({
                'is-danger': person.selected,
                'is-success': !person.selected,
              })}
              onClick={() => selectionHandler(person.id)}
            >
              <span className="icon is-small">
                <i
                  className={cn('fas', {
                    'fa-minus': person.selected,
                    'fa-plus': !person.selected,
                  })}
                />
              </span>
            </Button>
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
