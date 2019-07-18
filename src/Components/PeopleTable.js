import React from 'react';
import User from './User';

class PeopleTable extends React.Component {
  state = {
    selectedUser: null,
  };

  render() {
    const { users } = this.props;
    return (
      <table className="people-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>century</th>
            <th>name</th>
            <th>sex</th>
            <th>born</th>
            <th>died</th>
            <th>age</th>
            <th>mother</th>
            <th>father</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <User key={user.id}
              user={user}
              isSelected={this.state.selectedUser === user.id}
              selectUser={() => {
                this.setState({ selectedUser: user.id });
              }}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default PeopleTable;
