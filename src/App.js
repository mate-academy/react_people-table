import React from 'react';
import PeopleTable from './components/PeopleTable';
import dataPeople from './data/dataPeople';
import './App.css';

const getReverse = ({ people }) => {
  return [...people].reverse();
};
class App extends React.Component {
    state = {
      people: [],
      direction: 1,
    };

    componentDidMount() {
      this.loadData();
    }

  loadData = async() => {
    const people = await dataPeople();
    this.setState({
      people: people,
    });
  };

  handleClickReverse = () => {
    this.setState(prevState => {
      return {
        people: getReverse(prevState),
      };
    });
  };

  render() {
    const { people } = this.state;
    const result = people
      .map((person, idx) => {
        const id = idx + 1;
        const age = person.died - person.born;
        const century = Math.ceil(person.died / 100);
        const children = people
          .filter(child => child.father === person.name
              || child.mother === person.name)
          .map(human => human.name)
          .join(', ');

        const classes = ['people__table--col col'];
        if (person.sex === 'f') {
          classes.push('person--female');
        } else {
          classes.push('person--male');
        }
        if (person.born < 1650) {
          classes.push('people__table--col-less1650');
        }
        if (person.died > 1800) {
          classes.push('people__table--col-died1800');
        }
        if (age > 65) {
          classes.push('people__table--col-more65');
        }
        classes.push(`person--lived-in-${century}`);
        if (people
          .filter(child => child.father === person.name)
          .map(human => human.name)
          .join(' ')) {
          classes.push('person--father');
        } else if (people
          .filter(child => child.mother === person.name)
          .map(human => human.name)
          .join(' ')) {
          classes.push('person--mother');
        } else {
          classes.push('person--without--parents');
        }
        return (
          <tbody key={people + Math.random()} className="people__table">
            <tr className={classes.join(' ')}>
              <td className={classes}>{ id }</td>
              <td
                className={classes}
              >
                { person.name }
              </td>
              <td
                className={classes}
              >
                { person.sex }
              </td>
              <td className={classes}>{ person.born }</td>
              <td className={classes}>{ person.died }</td>
              <td className={classes}>{ person.mother }</td>
              <td className={classes}>{ person.father}</td>
              <td className={classes}>{ age }</td>
              <td className={classes}>{ century }</td>
              <td className={classes}>{ children }</td>
            </tr>
          </tbody>
        );
      });
    return (
      <>
        <h1 className="people__title">
          People: {people.length}
        </h1>
        <table className="PeopleTable table">
          <PeopleTable sort={this.handleClickReverse} />
          {result}
        </table>
      </>
    );
  }
}

export default App;
