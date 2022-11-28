import { Component } from 'react';
import classNames from 'classnames';

import { Person } from '../../types/Person';
import './PeopleTable.scss';

interface Props {
  people: Person[]
}

interface State {
  selectedPerson: Person | null;
}

export class PeopleTable extends Component<Props, State> {
  state: Readonly<State> = {
    selectedPerson: null,
  };

  handlePersonSelection = (person: Person | null) => {
    this.setState({ selectedPerson: person });
  }

  isSelected = (person: Person) => {
    return person.slug === this.state.selectedPerson?.slug;
  }

  render() {
    const { isSelected } = this;
    const { people } = this.props;
    const { selectedPerson } = this.state;

    return (
      <table className="table is-striped is-narrow">
        <caption>{selectedPerson?.name || 'Nobody selected'}</caption>
        <thead>
          <tr>
            <th>-</th>
            <th>name</th>
            <th>sex</th>
            <th>born</th>
          </tr>
        </thead>

        <tbody>
          {people.map(person => (
            <tr
              key={person.slug}
              className={classNames('Person', {
                isSelected: isSelected(person),
              })}
            >
              <td>
                {isSelected(person)
                  ? (
                    <button
                      type="button"
                      onClick={() => this.handlePersonSelection(null)}
                    >
                      -
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      onClick={() => this.handlePersonSelection(person)}
                    >
                      +
                    </button>
                  )}
              </td>
              <td>{person.name}</td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
