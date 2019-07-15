import React from 'react';
import PeopleTable from './components/PeopleTable';
import getPeople from './api/getPeople';
import './App.css';

class App extends React.Component {
  state = {
    people: [],
  };

  async componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const people = await getPeople();
    this.setState({ people });
  };

  render() {
    const { people } = this.state;
    return (
      <div className="App">
        <h1>
          People table
          (
          {`${people.length}`}
          )
        </h1>
        <PeopleTable
          people={people}
        />
      </div>
    );
  }
}

export default App;
