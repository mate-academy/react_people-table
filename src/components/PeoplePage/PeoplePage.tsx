import React, { useState, useEffect } from 'react';

import { getData } from '../../api';

import PeopleTable from '../PeopleTable/PeopleTable';

import './PeoplePage.css';

interface PersonTable {
  id: number;
  name: string;
  sex: string;
  fatherName: string;
  motherName: string;
  born: number;
  died: number;
  slug: string;
  age: number;
  century: number;
}

const HomePage = () => {
  const [people, setPeople] = useState<PersonTable[]>([]);


  useEffect(() => {
    getData().then((list) => {
      setPeople(list);
    });
  }, []);

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
