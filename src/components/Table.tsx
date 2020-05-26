import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import THead from './THead/THead';
import TBody from './TBody/TBody';
import './Table.scss';

type Props = {
  people: PersonWithId[];
};

const Table: React.FC<Props> = ({ people }) => {
  const history = useHistory();
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);

  const filterPeople = () => (
    people.filter(person => {
      const filterText = (person.name + person.motherName + person.fatherName).toLowerCase();

      return filterText.includes((searchParam.get('query') || '').toLowerCase());
    })
  );

  return (
    <div className="table">
      <h1>People</h1>
      <input
        className="table__search_field"
        type="text"
        value={searchParam.get('query') || ''}
        onChange={event => {
          event.target.value
            ? searchParam.set('query', event.target.value)
            : searchParam.delete('query');
          history.push({
            search: searchParam.toString(),
          });
        }}
      />
      <table className="table__wrapper">
        <THead />
        <tbody>
          {filterPeople().map(person => (
            <TBody
              person={person}
              key={person.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
