import React from 'react';
import { PersonFromTable } from './PersonFromTable';
import { Person } from './types/Person';

type Props = {
  peopleToDisplay: Person[];
};

type State = {
  selectedPersonSlug: string;
};

export class PeoplesTable extends React.Component<Props, State> {
  state: State = {
    selectedPersonSlug: '',
  };

  handleSelectPerson = (personSlug: string) => {
    this.setState({
      selectedPersonSlug: personSlug,
    });
  };

  render() {
    const {
      peopleToDisplay,
    } = this.props;

    const {
      selectedPersonSlug,
    } = this.state;

    return (
      <table className="table is-narrow">
        <thead>
          <tr>
            <th>name</th>
            <th>sex</th>
            <th>born</th>
            <th>select</th>
          </tr>
        </thead>

        <tbody>
          {peopleToDisplay.map(person => (
            <PersonFromTable
              key={person.slug}
              selectPerson={this.handleSelectPerson}
              person={person}
              className={
                selectedPersonSlug === person.slug
                  ? 'selected'
                  : ''
              }
            />
          ))}
        </tbody>
      </table>
    );
  }
}
