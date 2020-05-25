import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getPeople } from './api';
import { People } from './interface';
import PeopleTable from './PeopleTable';


const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quary = searchParams.get('query') || '';
  const regExp = new RegExp(quary, 'i');

  const isLoad = async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
  };

  useEffect(() => {
    isLoad();
  }, []);

  const handlfilter = (event: any) => {
    searchParams.set('query', event.target.value);
    history.push({
      search: searchParams.toString(),
    });

    const filterPeople = [...people]
      .filter((item: People) => regExp.test(item.name + item.fatherName + item.motherName));

    setFilteredPeople(filterPeople);
  };

  return (
    <>
      <h1>PeoplePage</h1>
      <input
        type="text"
        value={quary}
        onChange={handlfilter}
      />
      {filteredPeople.length >= 1
        ? <PeopleTable people={filteredPeople} />
        : <PeopleTable people={people} />}

    </>
  );
};

export default PeoplePage;
