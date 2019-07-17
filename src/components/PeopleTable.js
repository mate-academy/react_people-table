import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class PeopleTable extends React.Component {
  state = {
    selectedPersonId: null,
  };

  render() {
    const { people } = this.props;
    const { selectedPersonId } = this.state;
    const result = people.map((person) => (
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
    ));
    return (

            <tbody>
          {result}
            </tbody>
    );
  }
}
PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSortFieldChanged: PropTypes.func,
};
export default PeopleTable;
