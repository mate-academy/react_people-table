import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { Button } from '../Button';

type Props = {
  people: Person[];
};

type State = {
  selectedPerson: Person | null;
};

export class PeopleTable extends React.Component<Props, State> {
  state: Readonly<State> = {
    selectedPerson: null,
  };

  selectPerson = (person: Person | null) => {
    this.setState({
      selectedPerson: person,
    });
  };

  render() {
    const { people } = this.props;
    const { selectedPerson } = this.state;

    if (people.length === 0) {
      return (
        <p>No people data yet</p>
      );
    }

    function isPersonSelected(person: Person) {
      return person.slug === selectedPerson?.slug;
    }

    return (
      <table className="table is-striped is-narrow">
        <caption className="title is-5 has-text-info">
          {selectedPerson?.name || '-'}
        </caption>

        <thead>
          <tr>
            <th>select</th>
            <th>name</th>
            <th>sex</th>
            <th>born</th>
          </tr>
        </thead>

        <tbody>
          {people.map(person => (
            <tr
              key={person.slug}
              className={classNames({
                'has-background-warning': isPersonSelected(person),
              })}
            >
              <td>
                {isPersonSelected(person)
                  ? (
                    <Button
                      className="is-danger"
                      onClick={() => this.selectPerson(null)}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-minus" />
                      </span>
                    </Button>
                  )
                  : (
                    <Button
                      className="is-success"
                      onClick={() => this.selectPerson(person)}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-plus" />
                      </span>
                    </Button>
                  )}
              </td>
              <td
                className={classNames({
                  'has-text-link': person.sex === 'm',
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
