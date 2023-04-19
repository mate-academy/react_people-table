/* eslint-disable no-console */

import React from 'react';
import { Person } from '../types/Person';
import classNames from 'classnames';

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

  handleSelectingPerson = (person: Person) => {
    this.setState({ person });
  }

  render() {
    const { people } = this.props;
    const { person } = this.state;

    if (!people.length) {
      return (
        <div className="box">
          <h1 className="title">No people yet in Database</h1>
        </div>
      );
    }

    return (
      <div className="box">
        <h1 className="title">People table</h1>

        <table className="table is-striped is-narrow">
          <thead>
            <tr>
              <th> </th>
              <th>name</th>
              <th>sex</th>
              <th>born</th>
            </tr>
          </thead>

          <tbody>
            {people.map(currentPerson => (
              <tr
                key={currentPerson.slug}
                className={classNames({
                  'is-selected': currentPerson.slug === person?.slug,
                })}
              >
                <td>
                  <button
                    type="button"
                    className="button"
                    onClick={() => this.handleSelectingPerson(currentPerson)}
                  >
                    Select
                  </button>
                </td>
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
