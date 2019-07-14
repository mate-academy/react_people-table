import React from 'react';
import getFromServer from './Get';
import PeoplesTable from './PeoplesTable';
import SortPlant from './SortPlant';
import './app.css'
class App extends React.Component {
  state = {
    loadedPeople: [],
    peopleTemplate: [],
    isLoaded: false,
};

handleLoad = async() => {
  const addedRows = await getFromServer();
  this.setState({
    loadedPeople: [...addedRows],
    peopleTemplate: [...addedRows],
    isLoaded: true,
  });
};

handleInputSearch = (e) => {
  const search = e.target.value;
  this.setState (state => ({
    loadedPeople: state.loadedPeople
    .filter(pers => pers.name
      .toLowerCase()
      .indexOf(search.toLowerCase()) !== -1),
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
          <h2>People table with &nbsp;
            {this.state.isLoaded && this.state.loadedPeople.length}
            &nbsp;rows
          </h2>
        </header>
        <main>
          <button
            className="app_load-button"
            type="button"
            onClick={this.handleLoad}
            hidden={this.state.isLoaded}
            >
              Load the table
          </button>
          {console.log(this.state.loadedPeople)}
        <div>
        <form>
          <input
            placeholder="Search..."
            onChange={this.handleInputSearch}
            className="app_search-input"
          />
          <button
            onClick={this.reset}
            type="reset"
            className="app_sort-button"
          >
              RESET
          </button>
          </form>
        </div>
          <button
            onClick = {() => this.handleSortingBy('name')}
            className="app_sort-button"
            type="button"
            >
              sort by name
          </button>
          <button
            onClick = {() => this.handleSortingBy('id')}
            className="app_sort-button"
            type="button"
            >
             sort by ID
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
