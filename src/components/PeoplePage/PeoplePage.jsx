import React, { useEffect, useState, useCallback } from 'react';
import { getPeople } from '../../api/people';
import { PersonRow } from '../PersonRow/PersonRow';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const tableTitles = ['name', 'sex', 'born', 'died'];

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
    let search = location.search.split('?');
    for (let i = 0; i < tableTitles.length; i++) {
      if (search.includes(`sortBy=${tableTitles[i]}`)) {
        setIdSelected(tableTitles[i]);
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
      const insertedInput = param.toLowerCase().trim();
      setPeople(peopleFromServer.filter(person =>
        person.name.toLowerCase().startsWith(insertedInput)
        || (person.motherName && person.motherName.toLowerCase().startsWith(insertedInput))
        || (person.fatherName && person.fatherName.toLowerCase().startsWith(insertedInput))));
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
      setPeople(people
        .sort((a, b) => ((typeof b[id] === "number") - (typeof a[id] === "number"))
          || (a[id] > b[id] ? 1 : -1)
        ));
      order = 'asc';
    } else {
      setPeople(people
        .sort((a, b) => ((typeof a[id] === "number") - (typeof b[id] === "number"))
          || (b[id] > a[id] ? 1 : -1)
        ));
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
            {tableTitles.map(title => (
              <th
              key={title}
              id={title}
              onClick={(event) => { sortPeople(event.target.id) }}
              className={classNames({
                table__title: true,
                table__title_active: idSelected === title
              })}
            >
              {title}
              </th>
            ))}
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
