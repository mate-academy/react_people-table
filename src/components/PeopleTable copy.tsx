import React, { useEffect, useState, useMemo } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { getPeople } from './api';
import { PersonRow } from './PersonRow';
import { InputFilter } from './InputFilter';


type Props = RouteComponentProps<{
  location: string;
}>;
// type SortBy = keyof Person | null;

export const PeopleTable: React.FC<Props> = ({ location }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const query = useMemo(() => searchParams.get('query'), [searchParams]) || '';
  const sortBy = useMemo(() => searchParams.get('sortBy'), [searchParams]) || '';
  // const [sortBy, setSortBy] = useState(searchParams.get('sortBy') as keyof Person);
  // const sortOrder = useMemo(() => searchParams.get('sortOrder'), [searchParams]);
  // const sortBy: string = searchParams.get('sortBy') || '';
  // const [selectedTitle, setSelectedTitle] = useState('');

  const pattern = new RegExp(query, 'i');
  const fillteredPeople = people
    .filter(person => pattern.test(person.name + person.motherName + person.fatherName));

  // if (sortBy) {
  //   fillteredPeople = [...fillteredPeople].sort((a, b) => {
  //     // const valueA = a[sortBy as keyof Person];
  //     // const valueB = b[sortBy as keyof Person];
  //     type a = keyof Person;
  //     type b = keyof Person;

  //     if (typeof a[sortBy as keyof Person] === 'string' && typeof b[sortBy as keyof Person] === 'string') {
  //       return a.localeCompare(b);
  //     }

  //     if (typeof a === 'number' && typeof b === 'number') {
  //       return a - b;
  //     }

  //     return 0;
  //   });
  // }

  // const handleSortBy = (sortByName: keyof Person) => {
  //   setSortBy(sortByName);
  //   searchParams.set('sortBy', sortByName);
  //   history.push({
  //     search: searchParams.toString(),
  //   });
  // };

  const SortPeople = (column: string) => {
    const headers = ['born', 'died', 'name', 'sex'];
    // const history = useHistory();
    const sortablearr = [...people];
    // searchParams.set('sortBy', column);
    // history.push({ search: searchParams.toString() });

    if (headers.includes(column)) {
      searchParams.set('sortBy', column);

      history.push({
        search: searchParams.toString(),
      });
    }


    switch (column) {
      // case 'Born':
      //   setPeople(sortablearr.sort((a, b) => a.born - b.born));
      //   setPeople(sortablearr);
      //   break;
      case 'died':
        setPeople(sortablearr.sort((a, b) => +a.died - +b.died));
        setPeople(sortablearr);
        break;
      // case 'Name':
      //   setPeople(sortablearr.sort((a, b) => a.name.localeCompare(b.name)));
      //   setPeople(sortablearr);
      //   break;
      // case 'Sex':
      //   setPeople(sortablearr.sort((a, b) => a.sex.localeCompare(b.sex)));
      //   setPeople(sortablearr);
      //   break;
        // sortArr.sort((a: any, b: any) => a.born - b.born))
        // if (column !== setSelectedTitle) {
        //   setPeople([...people]
        //     .sort((a, b) => a[column] - b[column]));
        //   setSelectedTitle(column);
        // }
      default: setPeople([...people]);
    }
  };

  useEffect(
    () => SortPeople(sortBy),
    [sortBy],
  );

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
                onClick={() => SortPeople(item)}
              >
                {item}
                {sortBy === item && (
                  <>*</>
                )}
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
