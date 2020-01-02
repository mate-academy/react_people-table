import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Person from './Person';

const PeopleTable
  = ({ people, sortHandler, query, match, history, location }) => {
    const inputText = query.toLowerCase();
    const visiblePeople = people
      .filter(({ mother, father, name, children }) => (
        (mother + father + name + children).toLowerCase().includes(inputText)
      ));

    const params = new URLSearchParams(location.search);
    const activeName = location.pathname.replace('/people', '');

    const inputHandler = (event) => {
      const input = event.target.value.replace(/^\s+/, '');

      params.set('query', `${input}`);
      if (!input) {
        params.delete('query');
      }

      history.push({ search: `?${params.toString()}` });
    };

    const clickHandler = (name) => {
      history.push({
        pathname: `${match.path}/${name.replace(/\s+/g, '')}`,
        search: location.search,
      });
    };

    const head = Object.keys(people[0]);

    return (
      <>
        <input
          type="text"
          className="input"
          placeholder="Search by name"
          onChange={inputHandler}
          value={(params.get('query') || '')}
        />
        <table className="PeopleTable">
          <thead>
            <tr>
              {head.map(item => (
                <th
                  key={item}
                  className="PeopleTable__head-item"
                >
                  <button
                    className="button"
                    type="button"
                    onClick={() => (
                      sortHandler(item, `${match.path}${activeName}`)
                    )}
                  >
                    {item}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visiblePeople.map(person => (
              <Person
                key={person.id}
                person={person}
                people={people}
                highlightedPart={inputText}
                clickHandler={clickHandler}
              />
            ))
            }
          </tbody>
        </table>
      </>
    );
  };

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  query: PropTypes.string.isRequired,
  sortHandler: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({}).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(PeopleTable);
