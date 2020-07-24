import React, { FC } from 'react';
import { uuid } from 'uuidv4';
import { Link, useParams, useLocation } from 'react-router-dom';
import className from 'classnames';
import { PeopleListInterface } from '../../interfaces';
import { filterList, sortList, makeReverse } from './listToShow';

import './PersonRow.css';

interface PersonRowProps {
  people: PeopleListInterface[];
}

interface MatchParams {
  slug: string;
}

export const PersonRow: FC<PersonRowProps> = ({ people }) => {
  const currentPath = useParams<MatchParams>().slug;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryFilter = searchParams.get('query') || '';
  const querySort = searchParams.get('sortBy') || '';
  const querySortOrder = searchParams.get('sortOrder') || '';

  const filteredList = filterList(people, queryFilter);
  const sortedList = sortList(filteredList, querySort);
  const reversedList = makeReverse(sortedList, querySortOrder);

  return (
    <tbody>
      {reversedList.map((person, index) => {
        const mother = person.mother
          ? (
            <td>
              <Link
                className="red"
                to={{
                  pathname: `/people/${person.mother.slug}`,
                  search: searchParams.toString(),
                }}
              >
                {person.mother.name}
              </Link>
            </td>

          )
          : (
            <td>{person.motherName}</td>
          );
        const father = person.father
          ? (
            <td>
              <Link
                className="blue"
                to={{
                  pathname: `/people/${person.father.slug}`,
                  search: searchParams.toString(),
                }}
              >
                {person.father.name}
              </Link>
            </td>

          )
          : (
            <td>{person.fatherName}</td>
          );

        const rowClassName = className({ 'table-active': currentPath === person.slug });
        const sexClassName = className({
          blue: person.sex === 'm',
          red: person.sex === 'f',
        });

        return (
          <tr
            className={rowClassName}
            key={uuid()}
          >
            <td>{index + 1}</td>
            <td>
              <Link to={{
                pathname: `/people/${person.slug}`,
                search: searchParams.toString(),
              }}
              >
                {person.name}
              </Link>
            </td>
            <td className={sexClassName}>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {mother}
            {father}
          </tr>
        );
      })}
    </tbody>
  );
};
