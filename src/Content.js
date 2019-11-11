import React from 'react';
import './App.css';

import load from './load';
import ListUsers from './ListUsers';


class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      isLoaded: false,
      value: "",
      sortBy: null
    };

    this.loads = this.loads.bind(this);
    this.filter = this.filter.bind(this);
    this.SortBy = this.SortBy.bind(this);
  }

  async loads() {
    this.setState({ isLoaded: true });
    const users = await load(
      "https://mate-academy.github.io/react_people-table/api/people.json"
    );
    this.setState({ users });
  }

  filter(event) {
    this.setState({ value: event.target.value });
  }

  SortBy(sortBy) {
    this.setState({ sortBy });
  }

  render() {
    const { value } = this.state;
    return (
      <>
        <input
          type={"text"}
          value={value}
          onChange={this.filter}
          hidden={this.state.users === null}
        ></input>
        <button
          hidden={!this.state.isLoaded}
          disabled={this.state.sortBy === "id"}
          onClick={() => this.SortBy("id")}
        >
          id
        </button>
        <button
          hidden={!this.state.isLoaded}
          disabled={this.state.sortBy === "sex"}
          onClick={() => this.SortBy("sex")}
        >
          sex
        </button>
        <button
          hidden={!this.state.isLoaded}
          disabled={this.state.sortBy === "born"}
          onClick={() => this.SortBy("born")}
        >
          born
        </button>
        <button
          hidden={!this.state.isLoaded}
          disabled={this.state.sortBy === "died"}
          onClick={() => this.SortBy("died")}
        >
          died
        </button>
        <button
          hidden={!this.state.isLoaded}
          disabled={this.state.sortBy === "age"}
          onClick={() => this.SortBy("age")}
        >
          age
        </button>
        <button
          hidden={!this.state.isLoaded}
          disabled={this.state.sortBy === "century"}
          onClick={() => this.SortBy("century")}
        >
          century
        </button>
        <button hidden={this.state.isLoaded} onClick={() => this.loads()}>
          Load
        </button>
        <ListUsers list={this.state} />
      </>
    );
  }
}

export default Content;
