import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/order
import {
  Route,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import debounce from 'lodash/debounce';
import Person from './person';

const PeopleList = ({ people }) => {
  const { path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const searchParams = new URLSearchParams(location.search);
  const value = searchParams.get('query');
  let sortedPeople = '';

  const results = !value
    ? people
    : people.filter(person => (person.name.toLowerCase().trim()
      .includes(value.toLocaleLowerCase())
      || (person.mother !== null
        && person.mother
          .toLowerCase().trim().includes(value.toLocaleLowerCase()))
      || (person.father !== null
        && person.father
          .toLowerCase().trim().includes(value.toLocaleLowerCase()))
    ));

  const sortBy = searchParams.get('sortBy');

  if (sortBy) {
    sortedPeople
      = (typeof people[0][sortBy] === 'number'
      || typeof people[0][sortBy] === 'boolean')
        ? [...results]
          .sort((a, b) => (a[sortBy] - b[sortBy])
          * (searchParams.get('sortOrder') === 'asc' ? 1 : -1))
        : [...results]
          .sort((a, b) => (a[sortBy].localeCompare(b[sortBy]))
          * (searchParams.get('sortOrder') === 'asc' ? 1 : -1));
  } else {
    sortedPeople = results;
  }

  const historyPush = debounce(() => {
    history.push({ search: searchParams.toString() });
  }, 1000);

  const handlerInput = (event) => {
    searchParams.set('query', event.target.value.trim().toLowerCase());
    historyPush();
  };

  const sortPeople = (param) => {
    searchParams.set('sortBy', param);

    if (searchParams.get('sortBy') === param
      && searchParams.get('sortOrder') === 'asc') {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    history.push({ search: searchParams.toString() });
  };

  return (
    <div>
      <h2>People</h2>
      <Route path={path}>

        <>
          <div className="container">
            <input
              className="ui input"
              type="text"
              placeholder="Search..."

              onChange={handlerInput}
            />
          </div>
          <table className="PeopleTable">
            <thead>
              <tr className="Person">
                <th
                  onClick={() => sortPeople('id')}
                >
                Id
                </th>
                <th onClick={() => sortPeople('name')}>
                Name
                </th>
                <th onClick={() => sortPeople('sex')}>
                Sex
                </th>
                <th onClick={() => sortPeople('century')}>
                Century
                </th>
                <th onClick={() => sortPeople('born')}>
                Born
                </th>
                <th onClick={() => sortPeople('died')}>
                Died
                </th>
                <th onClick={() => sortPeople('age')}>
                Age
                </th>
                <th onClick={() => sortPeople('mother')}>
                Mother
                </th>
                <th onClick={() => sortPeople('father')}>
                Father
                </th>
                <th onClick={() => sortPeople('children')}>
                Children
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedPeople.map(person => (
                <Person
                  person={person}
                  key={person.id}
                  history={history}
                  location={location}
                />
              ))}
            </tbody>
          </table>
        </>
      </Route>

    </div>
  );
};

PeopleList.propTypes = { people: PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string,
  sex: PropTypes.string,
  born: PropTypes.number,
  died: PropTypes.number,
  father: PropTypes.string,
  mother: PropTypes.string,
  id: PropTypes.number,
  age: PropTypes.number,
  century: PropTypes.number,
  children: PropTypes.string,
})).isRequired };

export default PeopleList;
