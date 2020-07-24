import React, { FC } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { PersonType } from '../interfaces/interfaces';
import { PersonLink } from '../PersonLink/PersonLink';
import { sortPatterns } from '../SortPatterns/SortPatterns';

interface Props {
  people: PersonType[];
}

export const PeopleTableBody: FC<Props> = (props) => {
  const { people } = props;

  const { slug } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query');
  const sortBy = searchParams.get('sortBy')?.toLowerCase();
  const sortOrder = searchParams.get('sortOrder')?.toLowerCase();
  const sortByPatterns = sortPatterns;

  let renderedList = people;

  function includedQuery(name: string, query: string): boolean {
    return name.toLowerCase().includes(query.toLowerCase());
  }

  if (searchQuery) {
    renderedList = people.filter(person => {
      const { name, motherName, fatherName } = person;

      return includedQuery(name, searchQuery)
      || includedQuery(motherName, searchQuery)
      || includedQuery(fatherName, searchQuery);
    });
  }

  const sortPattern = sortByPatterns.find(pattern => pattern.sortBy === sortBy);

  if (sortPattern) {
    renderedList.sort(sortPattern.pattern);
  }

  if (sortOrder === 'desc') {
    renderedList.reverse();
  }

  return (
    <tbody>
      {renderedList.map(person => {
        const colorBySex = person.sex === 'm';

        return (
          <tr
            key={person.slug}
            className={classnames({
              'table-active': (person.slug === slug),
            })}
          >
            <th scope="row">
              <PersonLink
                slug={person.slug}
                name={person.name}
              />
            </th>
            <td
              style={{ color: colorBySex ? 'blue' : 'red' }}
            >
              {person.sex}
            </td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother?.slug
                ? (
                  <PersonLink
                    slug={person.mother?.slug}
                    name={person.motherName}
                  />
                )
                : person.motherName}
            </td>
            <td>
              {person.father?.slug
                ? (
                  <PersonLink
                    slug={person.father?.slug}
                    name={person.fatherName}
                  />
                )
                : person.fatherName}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
