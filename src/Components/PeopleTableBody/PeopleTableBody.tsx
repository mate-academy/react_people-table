import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { PersonType } from '../interfaces/interfaces';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: PersonType[];
}

interface TableBodyParams {
  slug?: string;
}

type PeopleTableBodyProps = RouteComponentProps<TableBodyParams> & Props;

const PeopleTableBody: FC<PeopleTableBodyProps> = (props) => {
  const { people, match } = props;

  const { slug } = match.params;

  return (
    <tbody>
      {people.map(person => {
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

export default withRouter(PeopleTableBody);
