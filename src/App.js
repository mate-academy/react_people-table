import React from 'react';
import getDataJson from './GetDataJson';
import PeopleTable from './PeopleTable';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      people: [],
      isLoaded: false,
    };
  }

  componentDidMount = async() => {
    const peopleArray = await getDataJson(
      'https://mate-academy.github.io/react_people-table/api/people.json'
    );
    const people = peopleArray.map((person, index, array) => (
      {
        id: index + 1,
        age: person.died - person.born,
        century: Math.ceil(person.died / 100),
        children: array.map(child => (person.name === child.father
          || person.name === child.mother)
            ? child
            : '')
          .filter(child => child !== ''),
        selected: false,
        ...person,
      }
    ));

    this.setState(() => (
      {
        people: [...people],
        isLoaded: true,
      }
    ));
  }

  handleNewPersonAdd = (name, sex, born, died, father, mother, children) => {
    let error = '';
    let correctName = '';
    let correctSex = '';
    let correctBorn = null;
    let correctDied = null;
    let correctFatherName = '';
    let correctMotherName = '';
    let correctCildrenNames = [];

    const currYear = new Date().getFullYear();

    error += typeof (name) !== 'string' ? 'Incorrect Name Type' : '';
    error += typeof (sex) !== 'string' ? 'Incorrect Gender Type' : '';
    error += typeof (born) !== 'number' ? 'Incorrect Born Type' : '';
    error += typeof (died) !== 'number' ? 'Incorrect Died Type' : '';
    error += typeof (father) !== 'string' ? 'Incorrect Father Name Type' : '';
    error += typeof (mother) !== 'string' ? 'Incorrect Mother Name Type' : '';
    error += typeof (children) !== 'string' ? 'Incorrect Cildren Names Type' : '';

    function makingName(name) {
      return name.split(' ')
        .map(part => part.trim().toLowerCase())
        .filter(part => part !== '')
        .map(part => part[0].toUpperCase() + part.slice(1))
        .join(' ');
    }

    correctName = makingName(name);
    correctFatherName = makingName(father);
    correctMotherName = makingName(mother);

    if (children) {
      correctCildrenNames = children.split(',')
        .map(name => name.trim())
        .filter(part => part !== '')
        .map(name => ({ name: makingName(name) }));
    }

    if (born > currYear) {
      error += 'Incorrect Year of Person\'s born';
    } else {
      correctBorn = born;
    }

    if (died !== 0 && died <= currYear && died >= born && died - born <= 150) {
      correctDied = died;
    } else if (died === 0 && died - born <= 150 && died - born >= 0) {
      correctDied = 0;
    } else if (died === 0 && currYear - born <= 150) {
      correctDied = undefined;
    } else {
      error += 'Incorrect Year of Person\'s death';
    }

    if (sex[0] === 'm' || sex[0] === 'f') {
      correctSex = sex[0];
    } else {
      error += 'Incorrect Gender only \'Male\' or \'Female\' expected';
    }

    if (error) {
      alert(error);

      return;
    }

    if (this.state.people.find(person => person.name === correctName)) {
      const flag = prompt(`Person Name ${correctName},
        you have entered, is already present! Continue?`, 'Yes');

      if (!flag) {
        return;
      }
    }

    this.setState(prevState => (
      {
        people: [
          ...prevState.people,
          {
            id: prevState.people.length + 1,
            name: correctName,
            sex: correctSex,
            born: correctBorn,
            died: correctDied !== undefined
              ? correctDied
              : null,
            age: correctDied !== undefined
              ? correctDied - correctBorn
              : currYear - correctBorn,
            century: correctDied !== undefined
              ? Math.ceil(correctDied / 100)
              : 21,
            father: correctFatherName,
            mother: correctMotherName,
            children: correctCildrenNames,
          },
        ],
      }
    ));
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoaded
          ? <PeopleTable
              peopleArray={this.state.people}
              addPersonHandler={this.handleNewPersonAdd}
            />
          : <h1>Still Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
