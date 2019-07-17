import React from 'react';
import propTypes from 'prop-types';
// import People from './People';
import './PeopleTable.scss';

const personRowClass = (age, sex, century, children, id, selected) => {
  let result = `person PeopleTable__row`
  + `${id === selected ? ' PeopleTable__row--selected' : ''}`;

  result += sex === 'f' ? ' person--female' : ' person--male';
  result += age > 65 ? ' green_border' : '';
  result += ` person--lived-in-${century}`;
  result += children !== undefined && (
    sex === 'f'
      ? ' person--mother'
      : ' person--father'
  );

  return result;
};

const personClassNameStyle = (died, born) => {
  let result = '';

  if (born < 1650) {
    result += ' born-before-1650';
  }

  if (died > 1800) {
    result += ' died-after-1800';
  }

  return result;
};

class PeopleTable extends React.Component {
  state = {
    selectedPerson: null,
    sortedPeopleList: this.props.peopleData,
  };

  async componentDidMount() {
    setTimeout(() => this.sortData('id'), 70);
  }

  sortData = (sortCase) => {
    this.setState(state => ({
      direction: state.direction === 1 ? -1 : 1,
      sortedPeopleList: [...this.props.peopleData].sort((a, b) => {
        switch (sortCase) {
          case 'id':
            return state.direction * (b[sortCase] - a[sortCase]);
          case 'age':
            return state.direction * (b[sortCase] - a[sortCase]);
          case 'born':
            return state.direction * (b[sortCase] - a[sortCase]);
          case 'died':
            return state.direction * (b[sortCase] - a[sortCase]);
          case 'name':
            return state.direction * a[sortCase].localeCompare(b[sortCase]);
          default: return 0;
        }
      }),
    }));
  };

  render() {
    const { selectedPerson } = this.state;

    return (
      <table className="PeopleTable">
        <thead>
          <tr className="table-head">
            <td>
              <button
                type="button"
                onClick={() => this.sortData('id')}
              >
                id
              </button>
            </td>
            <td>
              <button
                type="button"
                onClick={() => this.sortData('name')}
              >
                name
              </button>
            </td>
            <td>sex</td>
            <td>
              <button
                type="button"
                onClick={() => this.sortData('born')}
              >
                born
              </button>
            </td>
            <td>
              <button
                type="button"
                onClick={() => this.sortData('died')}
              >
                died
              </button>
            </td>
            <td>
              <button
                type="button"
                onClick={() => this.sortData('age')}
              >
                age
              </button>
            </td>
            <td>century</td>
            <td>mother</td>
            <td>father</td>
            <td>children</td>
          </tr>
        </thead>
        <tbody>
          {
            this.state.sortedPeopleList
              .map(onePersonData => (
                <tr
                  className={
                    personRowClass(
                      onePersonData.age,
                      onePersonData.sex,
                      onePersonData.century,
                      onePersonData.children,
                      onePersonData.id,
                      selectedPerson,
                    )
                  }
                  onClick={() => {
                    this.setState({
                      selectedPerson: onePersonData.id,
                    });
                  }}
                  key={onePersonData.id}
                >
                  <td className="centered-column">{onePersonData.id}</td>
                  <td className={
                    personClassNameStyle(onePersonData.died,
                      onePersonData.born)}
                  >
                    {onePersonData.name}
                  </td>
                  <td className="centered-column">{onePersonData.sex}</td>
                  <td>{onePersonData.born}</td>
                  <td>{onePersonData.died}</td>
                  <td>{onePersonData.age}</td>
                  <td className="centered-column">{onePersonData.century}</td>
                  <td>{onePersonData.mother}</td>
                  <td>{onePersonData.father}</td>
                  <td>
                    {
                      onePersonData.children !== undefined
                        ? onePersonData
                          .children.map(child => `${child.name},`) : ''
                    }
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
    );
  }
}

PeopleTable.propTypes = {
  peopleData: propTypes.arrayOf(propTypes.object).isRequired,
};

export default PeopleTable;
