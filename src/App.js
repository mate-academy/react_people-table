import React from 'react';
import getData from './api/getData';

class App extends React.Component {
  state = {
    people: [],
  };

  async componentDidMount() {
    const peopleFromApi = await getData();

    this.setState({
      people: peopleFromApi,
    });
  }

  render() {
    return (
      <main className="main">
        <div className="App">
          <h1>People table</h1>
          {this.state.people.length}
        </div>

      </main>
    );
  }
}

export default App;
