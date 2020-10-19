// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as api from '../../api/GetPeople';
import { PeoplesList } from './PeopleList';
import { SearchInput } from '../SearchSection/SearchInput';

export const Peoples = () => {
  const [people, setPeople] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const getUrlQuery = searchParams.get('query');

  const tableTitle = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  useEffect(() => {
    api.getPeople().then((peopleFromServer) => {
      setPeople(peopleFromServer);
      localStorage.setItem('people', JSON.stringify(peopleFromServer));
    });
  }, []);

  useEffect(() => {
    if (getUrlQuery) {
      setPeople(JSON.parse(localStorage.getItem('people')).filter((person) => {
        const { name, motherName, fatherName } = person;

        return (name.toLowerCase().includes(getUrlQuery)
          || (motherName && motherName.toLowerCase().includes(getUrlQuery))
          || (fatherName && fatherName.toLowerCase().includes(getUrlQuery))
        );
      }));
    } else {
      setPeople(JSON.parse(localStorage.getItem('people')));
    }
  }, [getUrlQuery]);

  return (
    <>
      <h1 className="title">Peoples Page</h1>
      <SearchInput />
      <table className="table">
        <thead className="table__title">
          <tr>
            {tableTitle.map(item => (
              <th className="table__title-item" key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people
            ? <PeoplesList people={[...people]} />
            : 'Loading...'
          }
        </tbody>
      </table>
    </>
  );
};
