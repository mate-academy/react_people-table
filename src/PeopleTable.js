import React from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Person from './Person';

const PeopleTable = ({ people, setSortBy }) => {
  const history = useHistory();
  const location = useLocation();
  const { personName } = useParams();

  const selectPerson = (name) => {
    const selectedName = name.toLowerCase().split(' ').join('-');

    if (selectedName !== personName) {
      history.push({
        pathname: `/people/${selectedName}`,
        search: location.search,
      });
    } else {
      history.push({
        pathname: `/people`,
        search: location.search,
      });
    }
  };

  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          <th className="sorting" onClick={() => setSortBy('id')}>
            ID
          </th>
          <th className="sorting" onClick={() => setSortBy('name')}>
            Name
          </th>
          <th className="sorting" onClick={() => setSortBy('sex')}>
            Sex
          </th>
          <th className="sorting" onClick={() => setSortBy('born')}>
            Born
          </th>
          <th className="sorting" onClick={() => setSortBy('died')}>
            Died
          </th>
          <th>Mother</th>
          <th>Father</th>
          <th className="sorting" onClick={() => setSortBy('age')}>
            Age
          </th>
          <th className="sorting" onClick={() => setSortBy('century')}>
            Century
          </th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <Person
            key={person.id}
            person={person}
            selectPerson={selectPerson}
          />
        ))}
      </tbody>
    </table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default PeopleTable;
