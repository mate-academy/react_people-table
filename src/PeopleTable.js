import React, { useState, useEffect } from 'react';
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
  const [query, setQuery] = useState('');

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setPeople(getPeopleList(peopleFromServer));
      });
  }, []);

  const filteredList = people.filter(
    item => (item.name.toLowerCase()
      .match(query.toLowerCase()))
        || ((item.mother !== null)
          ? (item.mother.toLowerCase()
            .match(query.toLowerCase()))
          : 1)
        || ((item.father !== null)
          ? (item.father.toLowerCase()
            .match(query.toLowerCase()))
          : 1)
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value.trim().toLowerCase());
        }}
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
            .filter(item => item.mother && item.father)
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
