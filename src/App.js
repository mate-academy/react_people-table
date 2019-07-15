import React from 'react';
import './App.css';
import getPeople from './api/api';
import PeopleTable from './components/PeopleTable';
import NewPerson from './components/NewPerson';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
    };
  }

  async componentDidMount() {
    await getPeople()
      .then((peopleData) => {
        this.setState(
          { people: [...peopleData] },
        );
      });
  }

  render() {
    return (
      <div className="App">
        <PeopleTable peopleData={this.state.people} />
        <NewPerson />
      </div>
    );
  }
}

export default App;
