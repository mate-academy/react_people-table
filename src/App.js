import React, { useState, useEffect } from 'react';
import './style.scss';
import PeopleTable from './PeopleTable';

const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

const loadPeople = () => fetch(URL).then(responce => responce.json());

const App = () => {
  const [people, setPeopleArr] = useState([]);
  const [serchName, setSerchName] = useState('');
  const [selectedButton, setValueButton] = useState('');

  const getPeople = async() => {
    const peopleArr = await loadPeople();

    setPeopleArr(peopleArr);
  };

  const changeName = (event) => {
    setSerchName(event.target.value);
  };

  const filterPeople = (arr, serch) => {
    if (serch === '') {
      return arr;
    }

    return arr.filter((item) => {
      if ((item.name.includes(serch))
      || (item.mother !== null && item.mother.includes(serch))
      || (item.father !== null && item.father.includes(serch))) {
        return item;
      }

      return false;
    });
  };

  const sortPeople = (select) => {
    switch (select) {
      case 'name':
        if (select !== selectedButton) {
          setPeopleArr([...people]
            .sort((a, b) => a.name.localeCompare(b.name)));
          setValueButton('name');
        }

        break;
      case 'born':
        if (select !== selectedButton) {
          setPeopleArr([...people]
            .sort((a, b) => a.born - b.born));
          setValueButton('born');
        }

        break;
      case 'died':
        if (select !== selectedButton) {
          setPeopleArr([...people]
            .sort((a, b) => a.born - b.born));
          setValueButton('died');
        }

        break;
      case 'age':
        if (select !== selectedButton) {
          setPeopleArr([...people]
            .sort((a, b) => (a.died - a.born) - (b.died - b.born)));
          setValueButton('age');
        }

        break;
      case 'centery':
        if (select !== selectedButton) {
          setPeopleArr([...people]
            .sort((a, b) => (
              Math.ceil(a.died / 100)) - (Math.ceil(b.died / 100))));
          setValueButton('centery');
        }

        break;
      case 'sex':
        if (select !== selectedButton) {
          setPeopleArr([...people]
            .sort((a, b) => a.sex.localeCompare(b.sex)));
          setValueButton('sex');
        }

        break;
      default: setPeopleArr([...people]);
    }

    if (select === selectedButton) {
      const arrReverse = [...people].reverse();

      setPeopleArr(arrReverse);
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div className="table">
      <h1 className="table__title">People table</h1>
      <div className="serch">
        <h3 className="serch__title">Serch name:</h3>
        <input
          type="text"
          className="serch__input"
          value={serchName}
          onChange={changeName}
        />
      </div>
      <PeopleTable
        people={filterPeople(people, serchName)}
        sortPeople={sortPeople}
      />
    </div>
  );
};

export default App;
