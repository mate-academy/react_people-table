import React from 'react';
import propTypes, { object } from 'prop-types';
import people from './people';
import './App.css';
// import { is, identifier } from '@babel/types';
// import { log } from 'util';

const peopleArr = peopleFromServer => (
  people.map(
    (person, index) => ({
      ...person,
      id: index + 1,
      century: Math.ceil(person.died / 100),
    })
  )
);

const peopleListArr = peopleArr(people);

class App extends React.Component {
  state = {
    peopleList: [...peopleListArr],
  }

  render() {
    return (
      <div className="App">
        <h1>
          People in table
          {people.length}
        </h1>
        <PeopleTable peopleList={this.state.peopleList} />
      </div>
    );
  }
}

const PeopleTable = ({ peopleList }) => (
  <table className="peopleTable">
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>age</th>
        <th>mother</th>
        <th>father</th>
        <th>centure</th>
      </tr>
    </thead>
    <tbody>
      {peopleList.map(person => (
        <tr
          key={person.id}
          className={person.sex === 'm'
            ? (
              `person person--male person--lived-in-${person.century}`
            )
            : (
              `person person--female person--lived-in-${person.century}`
            )
          }
        >
          <td>{person.id}</td>
          <td className={person.born < 1650 ? 'bornBefore1650' : ''}>
            {person.name}
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td className={person.died - person.born >= 65 ? 'ageMore65' : ''}>
            {person.died - person.born}
          </td>
          <td>{person.mother}</td>
          <td>{person.father}</td>
          <td>{person.century}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  peopleList: propTypes.arrayOf(object).isRequired,
};

export default App;
