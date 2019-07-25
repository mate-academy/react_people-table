import React from 'react';
import getPeople from './getPeople';
import PeopleTable from './PeopleTable';
import './styles/app.css';

const getData = async() => {
  const peopleData = await getPeople();
  return peopleData.map((person, index) => ({
    ...person,
    id: index,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    children: peopleData
      .filter(man => man.father === person.name
        || man.mother === person.name)
      .map(child => child.name).join(', '),
  }));
};

class App extends React.Component {
  people = [];

  state = {
    visiblePeople: [],
    sortField: '',
    currentSortField: '',
    currentPeople: [],
    filterField: '',
    query: '',
  };

  async componentDidMount() {
    this.people = await getData();
    this.setState({
      visiblePeople: this.people,
    });
  }

  getFilterSortPeoples = (sortField) => {
    const {
      currentSortField,
      currentPeople,
      visiblePeople,
      query,
    } = this.state;

    const normalizedQuery = query.toLowerCase();

    if (currentSortField === sortField
      && currentPeople === visiblePeople) {
      return this.setState({
        visiblePeople: [...visiblePeople].reverse(),
        currentPeople: [...visiblePeople].reverse(),
      });
    }

    const sortPeople = this.people
      .filter((person) => {
        const fieldForSearching = `
        ${person.name} ${person.mother} ${person.father}`;

        return fieldForSearching.toLowerCase().includes(normalizedQuery);
      })
      .sort((a, b) => {
        switch (typeof a[sortField]) {
          case 'string':
            return a[sortField].localeCompare(b[sortField]);
          case 'number':
          case 'boolean':
            return a[sortField] - b[sortField];
          default:
            return null;
        }
      });

    return this.setState({
      visiblePeople: sortPeople,
      sortField,
      currentSortField: sortField,
      currentPeople: sortPeople,
    });
  };

  handleQueryChange = (event) => {
    const query = event.target.value;
    this.getFilterSortPeoples(query);
    this.setState({
      query,
    });
  };

  setClearFilter = () => {
    this.setState({
      filterField: '',
      query: '',
      visiblePeople: this.people,
    });
  };

  render() {
    const {
      visiblePeople,
      query,
    } = this.state;

    return (
      <main className="main">
        <h1>
          {`People table with length ${visiblePeople.length}`}
        </h1>
        <div>
          <input
            type="text"
            value={query}
            placeholder="input word for filter"
            onChange={this.handleQueryChange}
            className="filter-input"
          />
          <button
            className={query ? 'filter-clear' : 'hidden'}
            onClick={this.setClearFilter}
          >
            X
          </button>
        </div>
        <PeopleTable
          people={visiblePeople}
          onSortFieldChange={this.getFilterSortPeoples}
        />
      </main>
    );
  }
}

export default App;
