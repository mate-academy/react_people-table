import React from 'react';
import getFromServer from './Get';
import PeoplesTable from './PeoplesTable';
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
    loadedPeople: addedRows,
    peopleTemplate: addedRows,
    isLoaded: true,
  });
};

handleInputSearch = (e) => {
  const search = e.target.value;
  this.setState(state => ({
    loadedPeople: state.loadedPeople
    .filter(pers => pers.name
      .toLowerCase()
      .indexOf(search.toLowerCase()) !== -1),
  }));
}

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
            className="load-button"
            type="button"
            onClick={this.handleLoad}
            hidden={this.state.isLoaded}
            >
              Load the table
          </button>
          {console.log(this.state.loadedPeople)}
        <div>
          <input placeholder="Search..." onChange={this.handleInputSearch}/>
        </div>
          <PeoplesTable peopleData={this.state.loadedPeople} />
        </main>
      </div>
    );
  }
};

export default App;
