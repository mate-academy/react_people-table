import React, { FC } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { Person } from './types/Person';
import peopleFromServer from './people.json';
import { Loader } from './components/Loader';
import { Button } from './Button';

interface State {
  users: Person[];
  isLoading: boolean;
  selectedUserSlug: string | null;
}

export class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    users: [],
    isLoading: true,
    selectedUserSlug: 'jan-frans-van-brussel-1761',
  };

  componentDidMount() {
    setTimeout(
      () => this.setState({
        users: peopleFromServer,
        isLoading: false,
      }),
      500,
    );
  }

  toggleSelectUser(slug: string) {
    const { selectedUserSlug } = this.state;

    const slugToSelect = selectedUserSlug === slug
      ? null
      : slug;

    this.setState({
      selectedUserSlug: slugToSelect,
    });
  }

  render() {
    const { users, isLoading, selectedUserSlug } = this.state;

    return (
      <div className="box">
        <h1 className="title">People table</h1>

        {isLoading && (
          <Loader />
        )}

        {!isLoading && users.length === 0 && (
          <h2>No users found</h2>
        )}

        {users.length > 0 && !isLoading && (
          <table className="table is-striped is-narrow">
            <thead>
              <tr>
                <th>select user</th>
                <th>name</th>
                <th>sex</th>
                <th>born</th>
                <th>slug</th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => {
                const isSelected = selectedUserSlug === user.slug;

                return (
                  <tr
                    key={user.slug}
                    className={cn('tableRow', {
                      'has-background-warning': isSelected,
                      'has-text-link': user.sex === 'm',
                      'has-text-danger': user.sex === 'f',
                    })}
                  >
                    <td>
                      <Button
                        onClick={() => this.toggleSelectUser(user.slug)}
                      >
                        {isSelected ? '-' : '+'}
                      </Button>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.sex}</td>
                    <td>{user.born}</td>
                    <td>{user.slug}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
