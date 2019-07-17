import React from 'react';
import getFiles from './GetFiles';
import PeopleTable from './PeopleTable';
import FuncSorting from './FuncSorting';

class App extends React.Component {
  state = {
    currentListOfPeople: [],
    listForSorting: [],
    isLoaded: false,
  }

onClickLoad = async() => {
  const listPeople = await getFiles();

  this.setState({
    currentListOfPeople: [...listPeople],
    listForSorting: [...listPeople],
    isLoaded: true,
  });
};

clickSortingBy = (sortType) => {
  this.setState({
    sortType,
  });

  this.setState(state => (
    { currentListOfPeople: FuncSorting(state, state.sortType) }
  ));
};

clickReset = () => {
  this.setState(state => ({
    currentListOfPeople: state.listForSorting,
  }));
};

searchFunc = (event) => {
  const { value } = event.target;

  this.setState(prevState => ({
    currentListOfPeople: prevState.listForSorting.filter(
      person => [person.mother, person.name, person.mother]
        .join('').toLowerCase().includes(value.toLowerCase())
    ),
  }));
}

render() {
  return (
    <div>
      <header>
        <h2>
          People table:
          {this.state.isLoaded && this.state.currentListOfPeople.length}
        </h2>
      </header>
      <main>
        <button
          className="load-button"
          type="button"
          onClick={this.onClickLoad}
          hidden={this.state.isLoaded}
        >
              Load the table
        </button>
        <form>
          <input
            placeholder="Search"
            onChange={this.searchFunc}
            className="app_search-input"
          />
        </form>
        <button
          onClick={() => this.clickSortingBy('name')}
          className="app_sort-button"
          type="button"
        >
              sort by name
        </button>
        <button
          onClick={() => this.clickSortingBy('id')}
          className="app_sort-button"
          type="button"
        >
              sort by id
        </button>
        <button
          onClick={() => this.clickSortingBy('age')}
          className="app_sort-button"
          type="button"
        >
              sort by age
        </button>
        <button
          onClick={() => this.clickSortingBy('born')}
          className="app_sort-button"
          type="button"
        >
                sort by born
        </button>
        <button
          onClick={() => this.clickSortingBy('died')}
          className="app_sort-button"
          type="button"
        >
                sort by died
        </button>
        <button
          onClick={() => this.clickReset()}
          className="app_sort-button"
          type="button"
        >
                RESET
        </button>
        <PeopleTable peopleData={this.state.currentListOfPeople} />
      </main>
    </div>
  );
}
}

export default App;
