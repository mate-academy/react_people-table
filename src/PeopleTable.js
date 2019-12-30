import React, { useState, useEffect } from 'react';
import { DebounceInput as SearchInput } from 'react-debounce-input';
import PropTypes from 'prop-types';
import Person from './Person';
import { getPeople } from './people';

const getPeopleList = peopleArr => (
  peopleArr.map(
    (person, index) => ({
      id: index + 1,
      ...person,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
    })
  )
);

const PeopleTable = ({ history, location, match }) => {
  const [people, setPeople] = useState([]);
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setPeople(getPeopleList(peopleFromServer));
      });
  }, []);

  const filteredList = searchParams.get('query')
    ? (people.filter(
      item => (item.name.concat(item.mother).concat(item.father))
        .toLowerCase()
        .includes((searchParams.get('query')))
    ))
    : [...people];

  const setCurrentQuery = ({ value }) => {
    searchParams.set('query', value.trim().toLowerCase());
    !value.trim() && searchParams.delete('query');
    history.push({
      search: searchParams.toString(),
    });
  };

  return (
    <>
      <SearchInput
        type="text"
        placeholder="Search"
        debounceTimeout={500}
        onChange={e => setCurrentQuery(e.target)}
      />
      <table className="PeopleTable">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
            <th>Age</th>
            <th>Century</th>
          </tr>
        </thead>
        <tbody>
          {filteredList
            .map(person => (
              <Person
                person={person}
                history={history}
                match={match}
                location={location}
                key={person.name}
              />
            ))}
        </tbody>
      </table>
    </>
  );
};

PeopleTable.propTypes = {
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default PeopleTable;
