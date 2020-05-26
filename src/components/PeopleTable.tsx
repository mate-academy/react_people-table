import React, { useMemo } from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { PersonRow } from './PersonRow';

const PeopleTableHeader = [
  { name: 'Id', sort: 'id' },
  { name: 'Name', sort: 'name' },
  { name: 'Sex', sort: 'sex' },
  { name: 'Born', sort: 'born' },
  { name: 'Died', sort: 'died' },
  { name: 'Mother' },
  { name: 'Father' },
];

type PeopleList = {
  people: PersonCompleted[];
};

export const PeopleTable = ({ people }: PeopleList) => {
  const match = useRouteMatch<MatchParams>();
  const location = useLocation();
  const history = useHistory();
  const { personName } = match.params;

  const searchParams = new URLSearchParams(location.search);

  const querySearch = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || '';

  const getVisiblePeople = (peopleGeneral: PersonCompleted[], query: string) => {
    const patternSearch = new RegExp(query, 'i');

    return peopleGeneral.filter(p => patternSearch.test(p.name || p.motherName || p.fatherName));
  };


  const sortPeople = (sortParam: string) => {
    switch (sortParam) {
      case 'name':
        return (a: PersonCompleted, b: PersonCompleted) => {
          return a.name.localeCompare(b.name);
        };

      case 'id':
        return (a: PersonCompleted, b: PersonCompleted) => a.id - b.id;
      case 'sex':
        return (a: PersonCompleted, b: PersonCompleted) => a.sex.localeCompare(b.sex);
      case 'born':
        return (a: PersonCompleted, b: PersonCompleted) => a.born - b.born;
      default:
        return (a: PersonCompleted, b: PersonCompleted) => a.died - b.died;
    }
  };

  const visiblePeople = useMemo(() => {
    return [...getVisiblePeople(people, querySearch)].sort(sortPeople(sortBy));
  }, [querySearch, sortBy, people]);


  const Sort = (sort: string) => {
    if (sort) {
      searchParams.set('sortBy', sort);
      history.push({
        search: searchParams.toString(),
      });
      sortPeople(sort);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr className="table-primary">
          {PeopleTableHeader.map((title: Title) => (
            <th
              key={title.name + Math.random}
              onClick={() => {
                Sort(title.sort || '');
              }}
            >
              {title.name}
              {sortBy === title.sort && '*' }
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {visiblePeople.map((person) => (
          <PersonRow personName={personName} person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
