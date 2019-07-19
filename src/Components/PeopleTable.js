import React from 'react';
import User from './User';

class PeopleTable extends React.Component {
  state = {
    selectedUser: null,
  };

  render() {
    const { users } = this.props;
    const { inputValue } = this.props;
    const { sortingHandle } = this.props;
    console.log(inputValue);
    return (
      <table className="people-table">
        <thead>
          <tr>
            <th className="people-table__head-cell" onClick={() => sortingHandle('id')}>id</th>
            <th className="people-table__head-cell" onClick={() => sortingHandle('century')}>century</th>
            <th className="people-table__head-cell" onClick={() => sortingHandle('name')}>name</th>
            <th className="people-table__head-cell" onClick={() => sortingHandle('sex')}>sex</th>
            <th className="people-table__head-cell" onClick={() => sortingHandle('born')}>born</th>
            <th className="people-table__head-cell" onClick={() => sortingHandle('died')}>died</th>
            <th className="people-table__head-cell" onClick={() => sortingHandle('age')}>age</th>
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
