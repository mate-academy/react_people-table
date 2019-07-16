import React from 'react';

const getPeople = async() => {
  const url
    = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const response = await fetch(url);
  const people = await response.json();

  return people;
};

class App extends React.Component {
  state = {
    people: [],
  };

  async componentDidMount() {
    const people = await getPeople();

    this.setState({ people });
  }

  render() {
    const { people } = this.state;

    return (
      <div className='App'>
        <h1>
          Number of people:
          &nbsp;
          {people.length}
        </h1>
      </div>
    );
  }
}

export default App;
