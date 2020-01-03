import React, { useState, useEffect } from 'react';
import './style.scss';
import { Route, Link, useLocation, useHistory } from 'react-router-dom';
import PeopleTable from './PeopleTable';

const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

const loadPeople = () => fetch(URL).then(responce => responce.json());

const App = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const [people, setPeopleArr] = useState([]);
  const searchNameQuery = searchParams.get('query') || '';
  const [searchName, setSerchName] = useState(searchNameQuery);
  const [selectedButton, setValueButton] = useState('');

  useEffect(() => {
    setSerchName(searchNameQuery);
  }, [searchNameQuery]);

  const setCurrentQuery = (query) => {
    searchParams.set('query', query);
    history.push({ search: searchParams.toString() });
  };

  const getPeople = async() => {
    const peopleArr = await loadPeople();

    setPeopleArr(peopleArr.map((item, index) => (
      {
        ...item, id: index + 1,
      }
    )));
  };

  const changeName = (event) => {
    setSerchName(event.target.value.trimLeft());
    setCurrentQuery(event.target.value.trimLeft());
  };

  const filterPeople = (arr, search) => arr.filter((item) => {
    if ((item.mother + item.father + item.name)
      .toLowerCase().includes(search.toLowerCase().trim())) {
      return item;
    }

    return false;
  });

  const sortPeople = (select) => {
    switch (select) {
      case 'name':
      case 'sex':
        if (select !== selectedButton) {
          setPeopleArr([...people]
            .sort((a, b) => a[select].localeCompare(b[select])));
          setValueButton(select);
        }

        break;
      case 'died':
      case 'born':
      case 'id':
        if (select !== selectedButton) {
          setPeopleArr([...people]
            .sort((a, b) => a[select] - b[select]));
          setValueButton(select);
        }

        break;

      case 'age':
        if (select !== selectedButton) {
          setPeopleArr([...people]
            .sort((a, b) => (a.died - a.born) - (b.died - b.born)));
          setValueButton('age');
        }

        break;
      case 'centery':
        if (select !== selectedButton) {
          setPeopleArr([...people]
            .sort((a, b) => (
              Math.ceil(a.died / 100)) - (Math.ceil(b.died / 100))));
          setValueButton('centery');
        }

        break;
      default: setPeopleArr([...people]);
    }

    searchParams.set('sortBy', select);
    history.push({ search: searchParams.toString() });

    if (select === selectedButton) {
      const arrReverse = [...people].reverse();

      setPeopleArr(arrReverse);
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <>
      <Route
        path="/"
        exact
        render={() => (
          <Link
            to="/table"
            className="linkGo"
          >
            <h2>Go to table</h2>
          </Link>
        )}
      />
      <Route
        path="/table/:name?"
        render={() => (
          <div className="table">
            <h1 className="table__title">People table</h1>
            <div className="serch">
              <h3 className="serch__title">Serch name:</h3>
              <input
                type="text"
                className="serch__input"
                value={searchName}
                onChange={(event) => {
                  changeName(event);
                }}
              />
            </div>
            <PeopleTable
              people={filterPeople(people, location.search.slice(7))}
              sortPeople={sortPeople}
            />
          </div>
        )}
      />
    </>
  );
};

export default App;
