import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import Person from './Person';

const PeopleTable = ({ people, sort }) => {
  const columns = ['id', 'name', 'sex', 'born', 'died',
    'mother', 'father', 'age', 'century'];
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const highlightPerson = (name) => {
    history.push({
      pathname: `/table/${name.toLowerCase().replace(/ /g, '-')}`,
      search: location.search,
    });
  };

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map(column => (
            <th onClick={sort} key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <Person
            match={match.params.personName}
            highlight={highlightPerson}
            personData={person}
            columns={columns}
            key={person.name}
          />
        ))}
      </tbody>
    </table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  sort: PropTypes.func.isRequired,
};

export default PeopleTable;
