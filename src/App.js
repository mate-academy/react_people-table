import React from 'react';
import Data from './api/getData';
import PeopleTable from './PeopleTable';

import './style.css';

const getData = async() => {
  const people = await Data();

  return people.map((item, index) => ({
    ...item,
    id: index + 1
  }));
}

class App extends React.Component {
  state = {
    people: [],
    isLoaded: false
  };

  loadData = async () => {
    const people = await getData();

    this.setState({
      people,
      isLoaded: true
    });
  };

  render() {
    const { people, isLoaded } = this.state;
    return (
      <>
        <header>
          <h1>{people.length} People in TABLE</h1>
        </header>

        {isLoaded ? (
          <>
            {" "}
            <div className="filter">
              <input
                className="filter-input"
                type="text"
              />
            </div>
            <PeopleTable people={people} />
          </>
        ) : (
          <button
            className="start-btn"
            onClick={this.loadData}
            type="button"
          >
            Open TABLE
          </button>
        )}
      </>
    );
  }
}

export default App;
