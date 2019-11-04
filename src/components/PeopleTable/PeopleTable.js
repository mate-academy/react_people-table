import React from 'react';
import PropTypes from 'prop-types';

import Person from '../person/Person';
import Sort from '../sort/Sort';

class PeopleTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      sortType: 'all',
    }
  }

  inputValueChange = (event) => {
    this.setState({ inputValue: event.target.value })
  }

  sortTypeChange = (type) => {
    this.setState({ sortType: type })
  }

  filterInput = () => {
    const { peopleList } = this.props;
    const { inputValue } = this.state;
    return [...peopleList]
      .filter(person => {
        if
        ( person.name.toLowerCase().includes(inputValue) ||
          person.mother.toLowerCase().includes(inputValue) ||
          person.father.toLowerCase().includes(inputValue))
            {
              return person;
            }
      })
  }

  render(){
    const { selectPerson } = this.props;
    const { inputValue, sortType } = this.state;
    let sortedList;
    switch(sortType) {
      case 'id':
        sortedList = this.filterInput()
          .sort((a,b) => a - b);
        break;
      case 'name':
        sortedList = this.filterInput()
          .sort((a,b) => a.name.localeCompare(b.name));
        break;
      case 'sex':
        sortedList = this.filterInput()
          .sort((a,b) => b.sex.localeCompare(a.sex));
        break;
      case 'born':
        sortedList = this.filterInput()
          .sort((a,b) => a.born - b.born);
        break;
      case 'died':
          sortedList = this.filterInput()
            .sort((a,b) => a.died - b.died);
          break;
      case 'age':
          sortedList = this.filterInput()
            .sort((a,b) => a.age - b.age);
          break;
      case 'century':
          sortedList = this.filterInput()
            .sort((a,b) => a.century - b.century);
          break;
      default:
        sortedList = this.filterInput();
    }

    return (
      <>
        <Sort  sortTypeChange={this.sortTypeChange}/>
        <div className='filter'>
          <input type='text' value={inputValue} placeholder="Write filter text" onChange={this.inputValueChange} />
        </div>
        <table className="PeopleTable">
          <thead>
            <th>Id</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Father</th>
            <th>Mother</th>
            <th>Age</th>
            <th>Century</th>
          </thead>
          <tbody>
            {sortedList.map(person => <Person person={person} selectPerson={selectPerson} />)}
          </tbody>
        </table>
      </>
    )
  }
}

PeopleTable.propTypes = {
  peopleList: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectPerson: PropTypes.func.isRequired,
}

export default PeopleTable;
