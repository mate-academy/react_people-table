import React from 'react';

import PeopleTable from './components/PeopleTable/PeopleTable';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      peopleList: [],
      peopleListError: false,
      personId: 1,
      isLoading: true,
    }
  }

  getPeopleData = async () => {
    const response = await fetch('./api/people.json');

    return response.json();
  }

  componentDidMount() {
    this.getPeopleData()
      .then((people) => {
        const addSomeinfoToPeople = people
          .map(person => {
            const age = person.died - person.born;
            const century = Math.ceil(person.died / 100);
            const personId = this.state.personId;
            const mother = person.mother ? person.mother : '';
            const father = person.father ? person.father : '';

            this.setState({ personId: this.state.personId + 1 })
            return {
              ...person,
              age: Number(age),
              century: Number(century),
              selected: false,
              id: personId,
              mother: mother,
              father: father,
            }
          })

        this.setState({ peopleList: addSomeinfoToPeople, isLoading: false })
      })
      .catch(() =>
        this.setState({ peopleListError: true })
      )
  }

  selectPerson = (id) => {
    const { peopleList } = this.state;
    const checkedPersonInList = peopleList
      .map(person => {
        if (person.id === id) {
          person.selected = true;
          return person;
        } else {
          person.selected = false;
          return person;
        }
      })

      this.setState(prev => {
        return {
          ...prev,
          peopleList: checkedPersonInList,
        }
      })
  }

  render() {

    if (this.state.isLoading) {
      return (
        <div>Loading...</div>
      )
    } else {
      const { peopleList } = this.state;

      return (
        <PeopleTable peopleList={peopleList} selectPerson={this.selectPerson} />
      )
    }
  }
}

export default App;
