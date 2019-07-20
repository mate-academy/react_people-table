import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';
import AddPersonForm from './AddPersonForm';

class PeopleTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [...this.props.peopleArray],
      filteredPeople: [...this.props.peopleArray],
      inputValue: '',
      sortByField: 'id',
      selectedPersonsIds: [],
    };
  }

  addPersonFromProps = () => {
    if (this.state.people.length < this.props.peopleArray.length) {
      this.setState(prevState => (
        {
          people: [
            ...prevState.people,
            this.props.peopleArray[prevState.people.length],
          ],
          filteredPeople: [
            ...prevState.filteredPeople,
            this.props.peopleArray[prevState.people.length],
          ],
        }
      ));
    }
  }

  handleFilterNFM = (event) => {
    const { value } = event.target;

    this.setState(prevState => (
      {
        inputValue: value,
        filteredPeople: prevState.people.filter(person => (
          person.name.toLowerCase().includes(value.toLowerCase())
          || (person.father && person.father.toLowerCase().includes(value.toLowerCase()))
          || (person.mother && person.mother.toLowerCase().includes(value.toLowerCase()))
        )),
      })
    );
  }

  handleSort = (field) => {
    let sortedArray = [];

    if (this.state.sortByField === field) {
      sortedArray = [...this.state.filteredPeople].reverse();
    } else
    {
      switch (typeof(this.state.filteredPeople[0][field])) {
        case 'string':
          sortedArray = [...this.state.filteredPeople].sort((a, b) => a[field].localeCompare(b[field]));
          break;
        case 'number':
          sortedArray = [...this.state.filteredPeople].sort((a, b) => a[field] - b[field]);
          break;
        case 'boolean':
          sortedArray = [...this.state.filteredPeople].sort((a, b) => a[field] - b[field]);
          break;
        default:
          sortedArray = [...this.state.filteredPeople];
      }
    }

    this.setState(
      {
        filteredPeople: [...sortedArray],
        sortByField: field,
      }
    );
  }

  handleSelect2 = (id) => {
    const index = this.state.selectedPersonsIds.findIndex(pID => pID === id);
    const arrayOfSelected = [...this.state.selectedPersonsIds];

    index >= 0 ? arrayOfSelected.splice(index, 1) : arrayOfSelected.push(id);

    this.setState(
      {
        selectedPersonsIds: [...arrayOfSelected],
      }
    );
  }

  render() {
    this.addPersonFromProps();

    return (
      <>
        <h1>
          People table of {this.state.filteredPeople.length} persons
        </h1>

        <AddPersonForm addPersonHandler={this.props.addPersonHandler}/>

        <div>
          <input
            type="text"
            placeholder="Search by Name and Parents"
            value={this.state.inputValue}
            onChange={this.handleFilterNFM}
          />
        </div>

        <table className="PeopleTable" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th className="clickable" onClick={() => this.handleSort('id')}>&nbsp;ID&nbsp;</th>
              <th className="clickable" onClick={() => this.handleSort('name')}>&nbsp;Name&nbsp;</th>
              <th className="clickable" onClick={() => this.handleSort('sex')}>&nbsp;Gender&nbsp;</th>
              <th className="clickable" onClick={() => this.handleSort('born')}>&nbsp;Born&nbsp;</th>
              <th className="clickable" onClick={() => this.handleSort('died')}>&nbsp;Died&nbsp;</th>
              <th className="clickable" onClick={() => this.handleSort('age')}>&nbsp;Age&nbsp;</th>
              <th className="clickable" onClick={() => this.handleSort('century')}>&nbsp;Century&nbsp;</th>
              <th>&nbsp;Mother&nbsp;</th>
              <th>&nbsp;Father&nbsp;</th>
              <th>&nbsp;Children&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filteredPeople.map(person => (
              <Person person={person} selectFunction={this.handleSelect2} selectedPeople={this.state.selectedPersonsIds} />
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

PeopleTable.propTypes = {
  peopleArray: PropTypes.array,
}

export default PeopleTable;
