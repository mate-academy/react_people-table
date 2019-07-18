import React from 'react';
import getFromServer from './Get';
import PeoplesTable from './PeoplesTable';
import SortPlant from './SortPlant';
import './app.css'
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

filteredPosts = (event) => {
  const { value, name } = event.target;
  this.setState (state => ({
    loadedPeople: state.peopleTemplate
    .filter((pers) => {
      if (pers.name + pers.mother + pers !== null) {
        return (pers.name + pers.mother + pers.father).toLowerCase()
        .includes(value
          .toLowerCase()
          .trim());
      }
    }),
  }));
};

handleSortingBy = (sortType) => {
  this.setState({
    sortType,
  });
  this.setState (state => ({
    loadedPeople: SortPlant(state),
  }));
};

reset = () => {
  this.setState (state => ({
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
                onChange={this.filteredPosts}
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
          <button
            onClick = {() => this.handleSortingBy('id')}
            className="app_sort-button"
            type="button"
            >
             sort by ID
          </button>
          <button
            onClick = {() => this.handleSortingBy('name')}
            className="app_sort-button"
            type="button"
            >
              sort by name
          </button>
          <button
            onClick = {() => this.handleSortingBy('born')}
            className="app_sort-button"
            type="button"
            >
             sort by born
          </button>
          <button
            onClick = {() => this.handleSortingBy('died')}
            className="app_sort-button"
            type="button"
           >
             sort by died
          </button>
          <button
            onClick = {() => this.handleSortingBy('age')}
            className="app_sort-button"
            type="button"
           >
             sort by age
          </button>
          <PeoplesTable peopleData={this.state.loadedPeople} />
        </main>
      </div>
    );
  }
};

export default App;
