import React, { useEffect, useState, useCallback } from 'react';
import { getPeople } from '../../api/people';
import { PersonRow } from '../PersonRow/PersonRow';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const PeoplePage = ({ match }) => {
  const [peopleFromServer, setPeopleFromServer] = useState([])
  const [people, setPeople] = useState([]);
  const [name, setName] = useState('');
  const [sort, setSort] = useState({});
  const [idSelected, setIdSelected] = useState('');

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  useEffect(() => {
    const ids = ['name', 'sex', 'died', 'born'];
    let search = location.search.split('?');
    for (let i = 0; i < ids.length; i++) {
      if (search.includes(`sortBy=${ids[i]}`)) {
        setIdSelected(ids[i]);
      }
    }
  }, [location.search]);

  useEffect(() => {
    getPeople().then(data => (setPeople(data), setPeopleFromServer(data)));
  }, []);

  useEffect(() => {
    filter(query);
  }, [query]);

  const filter = (param) => {
    if (param) {
      setPeople(peopleFromServer.filter(person =>
        person.name.toLowerCase().startsWith(param)
        || (person.motherName && person.motherName.toLowerCase().startsWith(param))
        || (person.fatherName && person.fatherName.toLowerCase().startsWith(param))));
    } else {
      setPeople(peopleFromServer);
    }
  }

  const debounce = (func, delay) => {
    let timerId = 0;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(func, delay, ...args)
    };
  }

  const updateQuery = (query) => {
    if (query) {
      searchParams.set('query', query);
    } else {
      searchParams.delete('query');
    }
    history.push({
      search: searchParams.toString(),
    });
  };

  const planQueryUpdate = useCallback(debounce(updateQuery, 500), []);

  const handleQueryUpdate = (event) => {
    setName(event.target.value)
    planQueryUpdate(event.target.value);
  }

  const sortPeople = (id) => {
    let order;
    if (!sort[id] || sort[id] === 'desc') {
      if (id === 'died' || id === 'born') {
        setPeople(people.sort((a, b) => (a[id] - b[id])));
      } else {
        setPeople(people.sort((a, b) => (a[id] && b[id] && a[id].localeCompare(b[id]))));
      }
      order = 'asc';
    } else {
      if (id === 'died' || id === 'born') {
        setPeople(people.sort((a, b) => (b[id] - a[id])));
      } else {
        setPeople(people.sort((a, b) => (a[id] && b[id] && b[id].localeCompare(a[id]))));
      }
      order = 'desc';
    }

    setSort({ [id]: order });
    history.push({
      search: `sortBy=${id}?sortOrder=${order}/`,
    });
  }

  return (
    <>
      <h1 className="title">This is People Page</h1>
      <input
        className="input is-primary"
        type="text"
        value={name}
        onChange={(event) => {
          handleQueryUpdate(event)
        }}
      >
      </input>
      <table className="table">
        <thead>
          <tr>
            <th
              id="name"
              onClick={(event) => { sortPeople(event.target.id) }}
              className={classNames({
                cell_active: idSelected === 'name'
              })}
            >
              Name
              </th>
            <th
              id="sex"
              onClick={(event) => { sortPeople(event.target.id) }}
              className={classNames({
                cell_active: idSelected === 'sex'
              })}
            >
              Sex
            </th>
            <th
              id="born"
              onClick={(event) => { sortPeople(event.target.id) }}
              className={classNames({
                cell_active: idSelected === 'born'
              })}
            >
              Born
            </th>
            <th
              id="died"
              onClick={(event) => { sortPeople(event.target.id) }}
              className={classNames({
                cell_active: idSelected === 'died'
              })}
            >
              Died
            </th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          <PersonRow people={people} idSelected={idSelected} ></PersonRow>
        </tbody>
      </table>
    </>
  )
}