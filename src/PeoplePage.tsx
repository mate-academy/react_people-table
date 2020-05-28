import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce'
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
  const isSortedAsc = searchParams.get('sortOrder') !== 'desc';
  const applyQueryWithDebounce = useCallback(debounce(setFilteredPeople, 1000), [])

  const isLoad = async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
    setLoading(false);
  };

  useEffect(() => {
    isLoad();
  }, []);

  const handlefilter = (event: any) => {
    const regExp = new RegExp(quary, 'i');

    searchParams.set('query', event.target.value);
    history.push({
      search: searchParams.toString(),
    });

    let filterPeople = [];

    if (filteredPeople.length === 0) {
      filterPeople = [...people]
        .filter((item: People) => regExp.test(item.name + item.fatherName + item.motherName));
      setFilteredPeople(filterPeople);
    } else {
      filterPeople = [...filteredPeople]
        .filter((item: People) => regExp.test(item.name + item.fatherName + item.motherName));

        applyQueryWithDebounce(filterPeople);
    }
  };

  const handleSord = (nameOfField: string): any => {
    let sortedPeople: any = [];
    let peopleCache: any = [];

    if (isSortedAsc) {
      searchParams.set('sortBy', nameOfField);
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortBy', nameOfField);
      searchParams.set('sortOrder', 'ask');
    }

    history.push({ search: searchParams.toString() });

    if (filteredPeople.length === 0) {
      peopleCache = [...people];
    } else {
      peopleCache = [...filteredPeople];
    }

    if (isSortedAsc) {
      switch (nameOfField) {
        case 'name':
        case 'sex':
          sortedPeople = [...peopleCache]
            .sort((a: People, b: People) => a[nameOfField]
              .localeCompare(b[nameOfField]));
          break;

        case 'born':
        case 'died':
          sortedPeople = [...peopleCache]
            .sort((a: People, b: People) => a[nameOfField] - b[nameOfField]);
          break;

        default:
          break;
      }
    } else {
      switch (nameOfField) {
        case 'name':
        case 'sex':
          sortedPeople = [...peopleCache].reverse();
          break;

        case 'born':
        case 'died':
          sortedPeople = [...peopleCache].reverse();
          break;

        default:
          break;
      }
    }

    setFilteredPeople(sortedPeople);
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
                onChange={handlefilter}
                placeholder="Username"
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
            <PeopleTable
              handleSord={handleSord}
              people={filteredPeople.length >= 1 ? filteredPeople : people}
            />
          </>
        )}
    </>
  );
};

export default PeoplePage;
