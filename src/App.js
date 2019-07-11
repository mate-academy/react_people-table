import React from 'react';

const getPeople = async() => {
  const Api = 'https://mate-academy.github.io/react_people-table/api/';
  return fetch(`${Api}/people.json`).then(respose => respose.json());
};

class App extends React.Component {
  state = {
    people: [],
  }

  async componentDidMount() {
    const people = await getPeople();

    this.setState({
      people,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>
        People table
          { this.state.people.length }
        </h1>
      </div>
    );
  }
}

export default App;
