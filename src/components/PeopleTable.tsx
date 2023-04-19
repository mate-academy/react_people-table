import React from 'react';
import { Person } from '../types/Person';

interface Props {
  people: Person[];
}

interface State {
  person: Person | null;
}

export class PeopleTable extends React.Component<Props, State> {
  state: Readonly<State> = {
    person: null,
  };

  render() {
    const { people } = this.props;
    const { person } = this.state;

    // eslint-disable-next-line no-console
    console.log(person);

    return (
      <div className="box">
        <h1 className="title">People table</h1>

        <table className="table is-striped is-narrow">
          <thead>
            <tr>
              <th>name</th>
              <th>sex</th>
              <th>born</th>
            </tr>
          </thead>

          <tbody>
            {people.map(currentPerson => (
              <tr key={currentPerson.slug}>
                <td>{currentPerson.name}</td>
                <td>{currentPerson.sex}</td>
                <td>{currentPerson.born}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
