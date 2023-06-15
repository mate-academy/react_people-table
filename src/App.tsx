import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { Person } from './types/Person';
import peopleFromServer from './people.json';
import { Loader } from './components/Loader';
import { Button } from './Button';
import { sortUsersBy } from './helpers';

interface State {
  users: Person[];
  isLoading: boolean;
  selectedUserSlugs: string[];
  sortBy: keyof Person | null;
  isReverse: boolean;
}

export class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    users: [],
    isLoading: true,
    selectedUserSlugs: ['jan-frans-van-brussel-1761'],
    sortBy: null,
    isReverse: false,
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
    const { selectedUserSlugs } = this.state;

    const isSelected = selectedUserSlugs.includes(slug);

    if (isSelected) {
      this.unselectUser(slug);
    }

    if (!isSelected) {
      this.selectUser(slug);
    }
  }

  selectUser(slug: string) {
    this.setState((currentState) => {
      const updatedSlugs = [...currentState.selectedUserSlugs, slug];

      return {
        selectedUserSlugs: updatedSlugs,
      };
    });
  }

  unselectUser(slug: string) {
    this.setState((currentState) => {
      const updatedSlugs = currentState.selectedUserSlugs.filter(s => (
        s !== slug
      ));

      return {
        selectedUserSlugs: updatedSlugs,
      };
    });
  }

  moveUp(slug: string) {
    this.setState(({ users }) => {
      const currentUserIndex = users.findIndex(user => user.slug === slug);
      const prevUserIndex = currentUserIndex - 1;

      if (currentUserIndex === -1 || currentUserIndex === 0) {
        return null;
      }

      const updatedUsers = [...users];

      updatedUsers[currentUserIndex] = users[prevUserIndex];
      updatedUsers[prevUserIndex] = users[currentUserIndex];

      return {
        users: updatedUsers,
      };
    });
  }

  moveDown(slug: string) {
    this.setState(({ users }) => {
      const currentUserIndex = users.findIndex(user => user.slug === slug);
      const nextUserIndex = currentUserIndex + 1;

      if (currentUserIndex === -1 || currentUserIndex === users.length - 1) {
        return null;
      }

      const updatedUsers = [...users];

      updatedUsers[currentUserIndex] = users[nextUserIndex];
      updatedUsers[nextUserIndex] = users[currentUserIndex];

      return {
        users: updatedUsers,
      };
    });
  }

  sortHandler(key: keyof Person) {
    const { sortBy, isReverse } = this.state;

    const isFirstClick = sortBy !== key;
    const isSecondClick = sortBy === key && !isReverse;

    if (isFirstClick) {
      this.setState({
        sortBy: key,
        isReverse: false,
      });

      return;
    }

    if (isSecondClick) {
      this.setState({ isReverse: true });

      return;
    }

    this.setState({
      sortBy: null,
      isReverse: false,
    });
  }

  render() {
    const {
      users, isLoading, selectedUserSlugs, sortBy, isReverse,
    } = this.state;
    const tableHeadKeys: (keyof Person)[] = ['name', 'sex', 'born', 'slug'];

    const sortedUsers = sortUsersBy({ users, sortBy, isReverse });

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
                <th>actions</th>
                {tableHeadKeys.map(key => (
                  <th
                    key={key}
                    onClick={() => this.sortHandler(key)}
                  >
                    {key}
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': key !== sortBy,
                          'fa-sort-up': key === sortBy && isReverse,
                          'fa-sort-down': key === sortBy && !isReverse,
                        })}
                      />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {sortedUsers.map(user => {
                const isSelected = selectedUserSlugs.includes(user.slug);

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

                      <Button
                        onClick={() => this.moveUp(user.slug)}
                      >
                        up
                      </Button>
                      <Button
                        onClick={() => this.moveDown(user.slug)}
                      >
                        down
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
