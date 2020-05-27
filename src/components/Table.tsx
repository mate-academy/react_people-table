import React, { useCallback, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import debounce from 'lodash.debounce';
import THead from './THead/THead';
import TBody from './TBody/TBody';
import './Table.scss';

type Props = {
  people: PersonWithId[];
};

const Table: React.FC<Props> = ({ people }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const history = useHistory();
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);

  const filterPeople = () => (
    people.filter(person => {
      const filterText = (person.name + person.motherName + person.fatherName).toLowerCase();

      return filterText.includes((searchParam.get('query') || '').toLowerCase());
    })
  );

  const pushUrlSearchParam = (inputQuery: string) => {
    if (inputQuery) {
      searchParam.set('query', inputQuery);
    } else {
      searchParam.delete('query');
    }

    history.push({
      search: searchParam.toString(),
    });
  };

  const debounceSearchParam = useCallback(debounce(pushUrlSearchParam, 500), []);

  return (
    <div className="table">
      <h1>People</h1>
      <input
        className="table__search_field"
        type="text"
        value={inputValue}
        onChange={({ target }) => {
          setInputValue(target.value);
          debounceSearchParam(target.value);
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
