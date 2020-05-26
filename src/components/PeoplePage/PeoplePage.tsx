import React, { useState, useEffect } from 'react';

import { getData } from '../../api';

import { PersonTable } from '../../interfaces/interfaces';

import PeopleTable from '../PeopleTable/PeopleTable';

import './PeoplePage.css';

const HomePage = () => {
  const [people, setPeople] = useState<PersonTable[]>([]);


  useEffect(() => {
    getData().then((list) => {
      setPeople(list);
    });
  }, [people]);

  return (
    <>
      <h1 className="header">
        People Page
      </h1>
      <PeopleTable people={people} />
    </>
  );
};

export default HomePage;
