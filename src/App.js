import React from 'react';
import classnames from 'classnames';
import PeopleTable from './components/PeopleTable';
import getPeople from './data/dataPeople';
import './App.css';

const sortPeople = ({ field, people, direction }) => {
  const sortedData = [...people];
  sortedData.sort((a, b) => {
    switch (typeof a[field]) {
      case 'string':
        return direction * (a[field].localeCompare(b[field]));

      case 'number':
      case 'boolean':
        return direction * (a[field] - b[field]);

      default:
        return 0;
    }
  });

  return sortedData;
};
class App extends React.Component {
    state = {
      people: [],
      visiblePeople: [],
      direction: 1,
      selectedPersonId: null,
    };

    componentDidMount() {
      this.loadData();
    }

  loadData = async() => {
    const people = await getPeople();
    this.setState({
      visiblePeople: [...people],
      people: people.map((person, index) => ({
        ...person,
        id: index + 1,
        age: person.died - person.born,
        century: Math.ceil(person.died / 100),
        children: people
          .filter(child => child.father === person.name
              || child.mother === person.name)
          .map(human => human.name)
          .join(', '),
      })),
    });
  };

  sortingBy = (field) => {
    this.setState({
      field,
    });
    this.setState(state => ({
      people: sortPeople(state),
      direction: state.direction === 1 ? -1 : 1,
    }));
  };

  handleSearch = (event) => {
    const search = event.target.value;
    this.setState(state => ({
      people: state.visiblePeople
        .filter(person => [person.name, person.mother, person.father]
          .join('')
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1),
    }));
  };

  render() {
    const { people, selectedPersonId } = this.state;
    const result = people
      .map((person) => {
        return (
          <tr
            key={people + Math.random()}
            onClick={() => this.setState({ selectedPersonId: person.id })}
            className={
              classnames(
                `PeopleTable__row
                ${ person.id === selectedPersonId
            ? 'PeopleTable__row--selected' : ''}`,
                `person--lived-in-${person.century}`,
                {
                  'people__table--col': true,
                  'person--female': person.sex === 'f',
                  'person--male': person.sex === 'm',
                  'people__table--col-less1650': person.born < 1650,
                  'people__table--col-died1800': person.died > 1800,
                  'people__table--col-more65': person.age > 65,
                  'person--father': people
                    .filter(child => child.father === person.name)
                    .map(human => human.name)
                    .join(' '),
                  'person--mother': people
                    .filter(child => child.mother === person.name)
                    .map(human => human.name)
                    .join(' '),
                  'person--without--parents': people
                    .filter(child => (child.mother && child.father) === null)
                    .map(human => human.name)
                    .join(' '),
                }
              )
            }
          >
            <td>{ person.id }</td>
            <td>
              { person.name }
            </td>
            <td>
              { person.sex }
            </td>
            <td>{ person.born }</td>
            <td>{ person.died }</td>
            <td>{ person.mother }</td>
            <td>{ person.father}</td>
            <td>{ person.age }</td>
            <td>{ person.century }</td>
            <td>{ person.children }</td>
          </tr>
        );
      });
    return (
      <>
        <h1 className="people__title">
          People: {people.length}
        </h1>
        <form className="form-horizontal">
          <input
            placeholder="Search..."
            onChange={this.handleSearch}
            className="form-control mb-4"
          />
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={() => this.sortingBy('name')}
          >
            sort by name
          </button>
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={() => this.sortingBy('id')}
          >
            sort by ID
          </button>
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={() => this.sortingBy('born')}
          >
            sort by born
          </button>
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={() => this.sortingBy('died')}
          >
            sort by died
          </button>
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={() => this.sortingBy('age')}
          >
            sort by age
          </button>
        </form>

        <table
          className="PeopleTable table"
        >
          <PeopleTable />
          <tbody className="people__table">
            {result}
          </tbody>
        </table>
      </>
    );
  }
}

export default App;
