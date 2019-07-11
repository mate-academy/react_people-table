import React from 'react';
import getPeople from './getPeople';
import PeopleTable from './PeopleTable';
import './styles/app.css';

const getData = async () => {
  const peopleData = await getPeople();
  return peopleData;
};

class App extends React.Component {
  state = {
    peopleData: [],
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const peopleData = await getData();
    this.setState({
      peopleData,
    });
  };

  render() {
    return (
      <main className="main">
        <h1>
          {`People table with length ${this.state.peopleData.length}`}
        </h1>
        <PeopleTable people={this.state.peopleData} />
      </main>
    );
  }
}

export default App;
