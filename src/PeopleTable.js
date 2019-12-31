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
  const [sortedField, setSortedField] = useState('id');
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setPeople(getPeopleList(peopleFromServer));
      });
  }, []);

  const getSortMethod = (titleOfColumn, order) => {
    if (titleOfColumn === 'name' || titleOfColumn === 'sex') {
      if (order === 'asc') {
        return (a, b) => a[titleOfColumn].localeCompare(b[titleOfColumn]);
      }

      if (order === 'desc') {
        return (a, b) => b[titleOfColumn].localeCompare(a[titleOfColumn]);
      }
    } else {
      if (order === 'asc') {
        return (a, b) => a[titleOfColumn] - b[titleOfColumn];
      }

      if (order === 'desc') {
        return (a, b) => b[titleOfColumn] - a[titleOfColumn];
      }
    }

    return undefined;
  };

  const getSortedData = ({ target }) => {
    const peopleList = people;
    const title = target.valueOf().textContent.toLowerCase();

    searchParams.set('sortBy', title);
    history.push({ search: searchParams.toString() });

    if (title !== sortedField) {
      peopleList
        .sort(
          getSortMethod(searchParams.get('query'))
        );
      setSortedField(title);
      searchParams.set('sortOrder', 'asc');
      history.push({ search: searchParams.toString() });
    } else {
      peopleList.reverse();
      setSortedField('');
      searchParams.set('sortOrder', 'desc');
      history.push({ search: searchParams.toString() });
    }
  };

  const preparedListOfPeople = searchParams.get('query')
    ? (people.filter(
      item => (item.name.concat(item.mother).concat(item.father))
        .toLowerCase()
        .includes((searchParams.get('query')))
    )
      .sort(
        getSortMethod(
          searchParams.get('sortBy'), searchParams.get('sortOrder')
        )
      ))
    : ([...people]
      .sort(
        getSortMethod(
          searchParams.get('sortBy'), searchParams.get('sortOrder')
        )
      ));

  const setCurrentQuery = ({ value }) => {
    searchParams.set('query', value.trim().toLowerCase());
    if (!value) {
      searchParams.delete('query');
    }

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
            <th onClick={getSortedData}>Id</th>
            <th onClick={getSortedData}>Name</th>
            <th onClick={getSortedData}>Sex</th>
            <th onClick={getSortedData}>Born</th>
            <th onClick={getSortedData}>Died</th>
            <th>Mother</th>
            <th>Father</th>
            <th onClick={getSortedData}>Age</th>
            <th onClick={getSortedData}>Century</th>
          </tr>
        </thead>
        <tbody>
          {preparedListOfPeople
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
