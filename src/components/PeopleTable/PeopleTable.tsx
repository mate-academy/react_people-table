import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types/Person';
import { PersonRow } from '../PersonRow';
import { TableHeaderField } from '../../types/TableHeaderField';
import { PeopleTableHeaderRow } from '../PeopleTableHeaderRow';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sortedBy = searchParams.get('sortBy');
  const sortedOrder = searchParams.get('sortOrder');
  const filterSex = searchParams.get('sex');
  const filterCenturies = searchParams.getAll('century');
  const filterQuery = searchParams.get('query');

  const isPeople = people !== null && people.length !== 0;

  const getVisiablePeople = (): Person[] | null => {
    if (!isPeople) {
      return null;
    }

    let result = [...people];

    if (sortedBy) {
      result.sort((a: Person, b: Person): number => {
        switch (sortedBy) {
          case TableHeaderField.Born:
          case TableHeaderField.Died:
            return a[sortedBy] - b[sortedBy];

          case TableHeaderField.Mother:
          case TableHeaderField.Father: {
            const nameA = a[`${sortedBy}Name`];
            const nameB = b[`${sortedBy}Name`];

            if (nameA !== null && nameB !== null) {
              return nameA.localeCompare(nameB);
            }

            if (nameB !== null) {
              return '-'.localeCompare(nameB);
            }

            if (nameA !== null) {
              return nameA.localeCompare('-');
            }

            return 0;
          }

          case TableHeaderField.Name:
          case TableHeaderField.Sex:
            return a[sortedBy].localeCompare(b[sortedBy]);

          default:
            return 0;
        }
      });
    }

    if (sortedOrder === 'desc') {
      result.reverse();
    }

    if (filterSex) {
      result = result.filter(person => {
        if (filterSex === 'm') {
          return person.sex === 'm';
        }

        if (filterSex === 'f') {
          return person.sex === 'f';
        }

        return null;
      });
    }

    if (filterCenturies.length) {
      result = result.filter(person => {
        const bornCentury = String(person.born + 100).slice(0, 2);

        return filterCenturies
          .some((century: string) => century === bornCentury);
      });
    }

    if (filterQuery) {
      result = result.filter(person => {
        return person.name
          .toLowerCase()
          .includes(filterQuery.toLowerCase())
          || (person.fatherName !== null && person.fatherName
            .toLowerCase()
            .includes(filterQuery.toLowerCase()))
          || (person.motherName !== null && person.motherName
            .toLowerCase()
            .includes(filterQuery.toLowerCase()));
      });
    }

    return result;
  };

  const visiableGoods = getVisiablePeople();

  return (
    <table
      data-cy="peopleTable"
      className={cn(
        'PeopleTable table is-striped is-hoverable is-narrow is-fullwidth',
        { 'border-collapse': true },
      )}
    >
      <PeopleTableHeaderRow />

      <tbody>
        {visiableGoods !== null && visiableGoods.map(person => (
          <PersonRow
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
