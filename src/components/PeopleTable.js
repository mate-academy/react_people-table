import React from 'react';
import propTypes from 'prop-types';
import './PeopleTable.scss';
import Human from './Human';

class PeopleTable extends React.Component {
  state = {
    sortedPeopleList: [...this.props.peopleData],
    direction: 1,
    selectedPerson: null,
  };

  sortData = (sortCase = 'id') => {
    this.setState(prevState => ({
      direction: prevState.direction === 1 ? -1 : 1,
      sortedPeopleList: [...this.props.peopleData]
        .sort((a, b) => (sortCase === 'name'
          ? prevState.direction * a[sortCase].localeCompare(b[sortCase])
          : prevState.direction * (b[sortCase] - a[sortCase]))),
    }));
  };

  handler = (inputValue) => {
    this.setState({
      selectedPerson: inputValue,
    });
  };

  render() {
    const sortCases = ['id', 'name', 'sex', 'born', 'died', 'age'];

    const { sortedPeopleList, selectedPerson } = this.state;

    return (
      <table className="PeopleTable">
        <thead>
          <tr className="table-head--row">
            {sortCases.map(inputCase => (
              inputCase === 'sex'
                ? (<td key={`tHead${inputCase}`}>{inputCase}</td>)
                : (
                  <td key={`tHead${inputCase}`}>
                    <button
                      type="button"
                      onClick={() => this.sortData(inputCase)}
                    >
                      {inputCase}
                    </button>
                  </td>
                )))}
            <td>century</td>
            <td>mother</td>
            <td>father</td>
            <td>children</td>
          </tr>
        </thead>
        <tbody key="tBody">
          {
            sortedPeopleList
              .map(onePersonData => (
                <Human
                  key={onePersonData.id}
                  personData={onePersonData}
                  handler={this.handler}
                  selectedPerson={selectedPerson}
                />
              ))
          }
        </tbody>
      </table>
    );
  }
}

PeopleTable.propTypes = {
  peopleData: propTypes.arrayOf(propTypes.object).isRequired,
};

export default PeopleTable;
