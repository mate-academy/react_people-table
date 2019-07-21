import React from 'react';
import getFromServer from './Get';
import PeoplesTable from './PeoplesTable';
import SortPlant from './SortPlant';

import './app.css';
class App extends React.Component {
  state = {
    loadedPeople: [],
    peopleTemplate: [],
  };

  async componentDidMount() {
    const addedRows = await getFromServer();
    this.setState({
      loadedPeople: [...addedRows],
      peopleTemplate: [...addedRows],
    });
  }

filteringPeople = (event) => {
  const { value } = event.target;
  const valueToLowerCase = value.toLowerCase().trim();
  this.setState(state => ({
    loadedPeople: state.peopleTemplate
      .filter((person) => {
        if (person.name + person.mother + person !== null) {
          return (person.name + person.mother + person.father).toLowerCase()
            .includes(valueToLowerCase);
        }
      }),
  }));
};

handleSortingBy = (sortType) => {
  this.setState({
    sortType,
  });
  this.setState(state => ({
    loadedPeople: SortPlant(state),
  }));
};

reset = () => {
  this.setState(state => ({
    loadedPeople: state.peopleTemplate,
  }));
};

render() {
  return (
    <div>
      <header>
        <h2>People table with {' '}
          {this.state.loadedPeople.length}
          {' '}rows
        </h2>
        </header>
      <main>
        <div>
          <label>
            <input
              type="text"
              placeholder="Search by name..."
              onChange={this.filteringPeople}
              className="app_search-input"
            />
          </label>

          <button
            onClick={this.reset}
            type="reset"
            className="app_sort-button"
          >
                  RESET
          </button>
        </div>
        <PeoplesTable
          peopleData={this.state.loadedPeople}
          onHandleSortingBy={this.handleSortingBy}
        />
      </main>
    </div>
  );
}
}

export default App;
