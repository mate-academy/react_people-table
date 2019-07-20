import React from 'react';
import classnames from 'classnames';

class PeopleTable extends React.Component {
  state = {
    selectedPersonId: null,
  }

  render() {
    const {
      handleClickSortById,
      handleClickSortByName,
      handleClickSortByBorn,
      handleClickSortByDied,
      handleClickSortByAge,
      people,
    } = this.props;
    const { selectedPersonId } = this.state;

    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={handleClickSortById}>ID</th>
            <th onClick={handleClickSortByName}>Name</th>
            <th>Sex</th>
            <th onClick={handleClickSortByBorn}>Born</th>
            <th onClick={handleClickSortByDied}>Died</th>
            <th>Mother</th>
            <th>Father</th>
            <th onClick={handleClickSortByAge}>Age</th>
            <th>Century</th>
            <th>Children</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <tr
              className={classnames({
                PeopleTable__row: true,
                'PeopleTable__row--selected': person.id === selectedPersonId,
                'person--father': person.sex === 'm'
                  && person.children.length > 0,
                'person--female': person.sex === 'f',
              })}
              onClick={() => this.setState({
                selectedPersonId: person.id,
              })}
            >
              <td>{person.id}</td>
              <td
                className={classnames({
                  persBornBefore: person.born < 1650,
                  persDiedAfter: person.died > 1800,
                })}
              >
                {person.name}
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{person.mother}</td>
              <td>{person.father}</td>
              <td className={person.age > 65 ? 'ageMore' : ''}>{person.age}</td>
              <td>{person.century}</td>
              <td>{person.children.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default PeopleTable;
