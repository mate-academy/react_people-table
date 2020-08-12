import React, { SyntheticEvent } from 'react';
import { useLocation } from 'react-router';
import { PersonRow } from './PersonRow';
import { PersonWithParents } from './types';

interface PeopleTableProps {
  peoples: PersonWithParents[];
  url: string;
  handleSorting(e: SyntheticEvent): void;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ peoples, url, handleSorting }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortField = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const sortPeople = (people: PersonWithParents[]) => {
    if (sortOrder) {
      switch (sortField) {
        case 'name':
          people
            .sort((a, b) => a.name.localeCompare(b.name));
          break;

        case 'sex':
          people
            .sort((a, b) => a.sex.localeCompare(b.sex));
          break;

        case 'born':
          people
            .sort((a, b) => a.born - (b.born));
          break;

        case 'died':
          people
            .sort((a, b) => a.died - (b.died));
          break;

        default:
      }
    }

    if (sortOrder === 'desc') {
      people.reverse();
    }

    return people;
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={handleSorting} className={sortField === 'name' ? 'title' : ''}>name</th>
          <th onClick={handleSorting} className={sortField === 'sex' ? 'title' : ''}>sex</th>
          <th onClick={handleSorting} className={sortField === 'born' ? 'title' : ''}>born</th>
          <th onClick={handleSorting} className={sortField === 'died' ? 'title' : ''}>died</th>
          <th>mother</th>
          <th>father</th>
        </tr>
      </thead>
      <tbody>
        {sortPeople(peoples).map((person: PersonWithParents) => (
          <PersonRow person={person} url={url} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
