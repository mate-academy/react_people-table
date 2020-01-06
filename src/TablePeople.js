import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const TablePeople = ({ people, setSortBy }) => {
  const location = useLocation();
  const history = useHistory();

  // const searchParams = new URLSearchParams(location.search);
  // const query = searchParams.get('query') || '';
  return (
    <div>
      <div className="people_table">
        <table className="ui inverted table">
          <thead>
            <tr>
              {/*eslint-disable */}
              <td onClick={() => setSortBy('id')}>id</td>
              <td onClick={() => setSortBy('name')}>name</td>
              <td onClick={() => setSortBy('century')}>century</td>
              <td onClick={() => setSortBy('born')}> born</td>
              <td onClick={() => setSortBy('died')}>died</td>
              <td onClick={() => setSortBy('age')}>age</td>
              <td onClick={() => setSortBy('sex')}>sex</td>
              {/* eslint-enable */}
              <td>mother</td>
              <td>father</td>
            </tr>
          </thead>
          <tbody>
            {people.map(person => (
              <tr
                onClick={() => {
                  history.push({
                    pathname: `/people/${person.name.replace(/\s/g, '-')}`,
                    search: location.search,
                  });
                }
                }
              >
                <td>{person.id}</td>
                <td className={person.born < 1650 ? 'before_1650' : ''}>
                  {person.name}
                </td>
                <td>{person.century}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td className={person.age >= 65 ? 'long_liver' : ''}>
                  {person.age}
                </td>
                <td className={person.sex === 'm' ? 'man' : 'woman'}>
                  {person.sex}
                </td>
                <td>{person.mother}</td>
                <td>{person.father}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

TablePeople.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default TablePeople;
