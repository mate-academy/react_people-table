import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import classnames from 'classnames';

const getPeople = (): Promise<Person[]> => {
  return fetch('./api/people.json')
    .then(res => res.json());
}

type Props = RouteComponentProps<{ personName: string;}>;

const PeoplePage: React.FC<Props> = ({ match, location, history }) => {
  const [people, setPeople] = useState<Person[]>([]);

  const { personName } = match.params;
  const searchParams = new URLSearchParams(location.search)

  const [query, setQuery] = useState('');

  useEffect(() => {
    getPeople().then(setPeople)
  }, []);
  const queryFromUrl: string = searchParams.get('query') || '';

  useEffect(() => {
    setQuery(query);
  }, [queryFromUrl]);

  const pattern = new RegExp(queryFromUrl, 'i');
  const visiblePeople = people
    .filter(p => pattern.test(p.name))

  //const visiblePeopleSorted = [...visiblePeople];
  const [sortField, setSortField] = useState('born');
  const [ascending, setAscending] = useState(true);

  if (people.length === 0) {
    return <p>Loading...</p>;
  }
  if (personName && !people.some(p => p.name === personName)) {
    history.push({
      pathname: '/people'
    });
  }

  let visiblePeopleSorted = visiblePeople.sort(
    (a, b) => {
      let _type = typeof a[sortField as keyof Person];
      let res = 0;
      switch (_type) {
        case 'number':
          res = (a[sortField as keyof Person] as number) - (b[sortField as keyof Person] as number);
          return ascending ? res : -1 * res;
        case 'string':
          res = (a[sortField as keyof Person] as string).localeCompare(b[sortField as keyof Person] as string);
          return ascending ? res : -1 * res;
        default:
          return res;
      }
    }
  );

  let columns = ['name', 'sex', 'born', 'died', 'motherName', 'fatherName', 'slug'];

  return (
    <div className="PeoplePage">
      <h1> People table
      </h1>
      <table>
        <thead>
          <tr>
            <th className="table__head">Row №</th>
            {columns.map(columnName => (
              <th
                className="table__head"
                onClick={() => {
                  setAscending(columnName === sortField && !ascending);
                  setSortField(columnName);
                  history.push({
                    search: `sortBy=${columnName}&ascending=${ascending}`
                  })
                }}
              >
                {columnName}&nbsp;{(columnName === sortField ? ascending ? "\u07E1" : "\u07DC" : '')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visiblePeopleSorted.map((person: Person, index) => {
            return (
              <tr key={index}
                className={classnames({
                  person__woman: person.sex === 'f',
                  person__man: person.sex === 'm',
                })}
                onClick={() => {
                  history.push({
                    pathname: `/people/${person.name}`,
                  });
                }
                }
              >
                <td>{index + 1}</td>
                {
                  columns.map((colName) =>
                    (<td
                      className={classnames({
                        'Person': true,
                        'Person--active': personName === person.name,
                      })}
                    >
                      {person[colName as keyof Person]}
                    </td>
                    ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PeoplePage;

