import React from 'react';

const peopleFromServer = 'https://mate-academy.github.io/react_people-table/api/people.json';

const getPeople = async () => {
  const response = await fetch(peopleFromServer);
  const people = await response.json();
  return people;
};

class App extends React.Component {
  state = {
    people: [],
    peopleCopy: [],
    isLoaded: false,
  }

  async componentDidMount() {
    const people = await getPeople();

    this.setState({
      people: people,
    });
  }

  render() {

    return (
      <div>
        <h1>{this.state.people.length}</h1>
      </div>
    )
  }
}

export default App;
