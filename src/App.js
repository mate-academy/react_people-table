import React from 'react';
import getDataFromServer from './getDataFromServer';
import PeopleTable from './PeopleTable';

import applySortBy from './applySortBy';
import './styles.css';

class App extends React.Component {
  state = {
    listOfPersons: [],
    visiblePersons: [],
    sortFiled: 'id',
  };

  async componentDidMount() {
    const people = await getDataFromServer();
    this.setState({
      people,
      visiblePersons: people,
    });
  }

  sortBy = (sortFiled) => {
    this.setState({
      sortFiled,
    });
    this.setState(prevState => ({
      visiblePersons: applySortBy(prevState),
    }));
  };

  render() {
    const { visiblePersons } = this.state;

    return (
      <section>
        <div className="App">
          <h1>People table: {visiblePersons.length}</h1>
        </div>

        <div className="sort__buttons">
          <h2>
            Sort by:
          </h2>

          <button
            type="button"
            onClick={() => this.sortBy('id')}
            className="sort-buttons__btn"
          >
            ID
          </button>

          <button
            type="button"
            onClick={() => this.sortBy('name')}
            className="sort-buttons__btn"
          >
            Name
          </button>

          <button
            type="button"
            onClick={() => this.sortBy('age')}
            className="sort-buttons__btn"
          >
            Age
          </button>

          <button
            type="button"
            onClick={() => this.sortBy('born')}
            className="sort-buttons__btn"
          >
            Year of birth
          </button>

          <button
            type="button"
            onClick={() => this.sortBy('died')}
            className="sort-buttons__btn"
          >
            Year of death
          </button>
        </div>

        <PeopleTable listOfPersons={visiblePersons} />
      </section>
    );
  }
}

export default App;
