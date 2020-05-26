import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getPeople } from './api';
import { People } from './interface';
import PeopleTable from './PeopleTable';


const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quary = searchParams.get('query') || '';
  const regExp = new RegExp(quary, 'i');

  const isLoad = async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
    setLoading(false);
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

  const handlSordByName = (name: string) => {
    history.push(`/people/?sortBy=${name}`);
    let filtered: any = [];

    if (name === 'name') {
      filtered = [...people].sort((a: People, b: People) => a.name.localeCompare(b.name));
    }

    if (name === 'sex') {
      filtered = [...people].sort((a: People, b: People): any => a.sex.localeCompare(b.sex));
    }

    if (name === 'born') {
      filtered = [...people].sort((a: People, b: People) => a.born - b.born);
    }

    if (name === 'died') {
      filtered = [...people].sort((a: People, b: People) => a.died - b.died);
    }

    setFilteredPeople(filtered);
  };

  return (
    <>
      <h1>PeoplePage</h1>
      {isLoading
        ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )
        : (
          <>
            <div className="input-group flex-nowrap">
              <input
                type="text"
                className="form-control"
                value={quary}
                onChange={handlfilter}
                placeholder="Username"
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
            <PeopleTable
              handlSordByName={handlSordByName}
              people={filteredPeople.length >= 1 ? filteredPeople : people}
            />
          </>
        )}
    </>
  );
};

export default PeoplePage;
