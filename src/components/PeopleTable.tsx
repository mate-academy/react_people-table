import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getPeople } from './api';
import { PersonRow } from './PersonRow';
import { InputFilter } from './InputFilter';


type Props = RouteComponentProps<{
  location: string;
}>;

export const PeopleTable: React.FC<Props> = ({ location }) => {
  const [people, setPeople] = useState<Person[]>([]);

  const searchParams = new URLSearchParams(location.search);
  const query: string = searchParams.get('query') || '';
  // const sortBy: string = searchParams.get('sortBy') || '';
  // const [selectedTitle, setSelectedTitle] = useState('');

  const pattern = new RegExp(query, 'i');
  const fillteredPeople = people
    .filter(person => pattern.test(person.name + person.motherName + person.fatherName));

  // const SortPeople = (select: string) => {
  //   const history = useHistory();

  //   searchParams.set('sortBy', select);
  //   history.push({ search: searchParams.toString() });

  //   switch (select) {
  //     case 'died':
  //     case 'born':
  //       if (select !== selectedTitle) {
  //         setPeople([...people]
  //           .sort((a, b) => a[select] - b[select]));
  //         setSelectedTitle(select);
  //       }

  //       break;
  //     default: setPeople([...people]);
  //   }
  // };

  useEffect(() => {
    getPeople().then(res => setPeople(
      res.map((person, i) => ({
        ...person,
        id: i + 1,
      })),
    ));
  }, []);


  const tableHeads = [
    'Name',
    'Sex',
    'Born',
    'Died',
    'Mother',
    'Father',
  ];

  return (
    <>
      <h2>People Table</h2>
      <InputFilter />
      <table className="peopleTable">
        <thead className="table-success">
          <tr>
            {tableHeads.map(item => (
              <th
                key={item}
                // onClick={() => SortPeople('select')}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <PersonRow people={fillteredPeople} />
        </tbody>
      </table>
    </>
  );
};
