import React, { useEffect, useState } from 'react';
import './App.css';
import { getDataFromServer } from './helpers/api';
import { TableHeader } from './Components/TableHeader';
import { People } from './Components/People';

const App: React.FC = () => {
  const tableCaptions = [
    'Id',
    'Name',
    'Sex',
    'Born',
    'Died',
    'Mother',
    'Father',
    'Age',
    'Century',
  ];

  const [tableWithPeople, setTableWithPeople] = useState <Person[]>([]);

  const getData = async () => {
    const data = await getDataFromServer();

    setTableWithPeople(data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const getPreparedData = () => {
    return [...tableWithPeople].map((person) => {
      // eslint-disable-next-line no-param-reassign
      delete person.slug;

      return {
        ...person,
        age: person.died - person.born,
        century: Math.ceil(person.died / 100),
      };
    });
  };

  const res = getPreparedData();

  return (
    <div className="App">
      <table>
        <caption>People table</caption>
        <TableHeader columnNames={tableCaptions} />
        <People people={res} />

      </table>

    </div>
  );
};

export default App;
