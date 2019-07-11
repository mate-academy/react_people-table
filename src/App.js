import React from 'react';
import getFromServer from './Get';
import PeoplesTable from './PeoplesTable';
import './app.css'


class App extends React.Component {
  state = {
    loadedPeople: [],
    isLoaded: false,
};

handleLoad = async() => {
  const people = await getFromServer();
  this.setState({
    loadedPeople: people,
    isLoaded: true,
  });
};

  render() {
    return (
      <div>
        <header>
          <h2>People table with
            {this.state.isLoaded && this.state.loadedPeople.length}
              rows
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
          <PeoplesTable peopleData ={this.state.loadedPeople} />
        </main>
      </div>
    );
  }
};

export default App;
