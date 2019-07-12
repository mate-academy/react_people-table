import React, { Component } from 'react'
import getUsers from './components/api/getUsers'

import PeopleTable from './components/PeopleTable/PeopleTable'
import AddUserWindow from './components/AddUserWindow/AddUserWindow'
import './App.css'

export default class App extends Component {
  state = {
    users: [],
    usersToShow: [],
    isLoading: false,
    direction: false,
    selectedRow: null,
    isUserAdding: false,
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = async() => {
    this.setState({ isLoading: true })

    const users = await getUsers()
    const mappedUsers = users.map((user, index) => ({
      ...user,
      mother: user.mother || 'None',
      father: user.father || 'None',
      id: index + 1,
      age: user.died - user.born,
      century: Math.ceil(user.died / 100),
      children: users.filter(child => (
        user.name === child.mother || user.name === child.father
      )),
    }))

    this.setState({
      users: mappedUsers,
      usersToShow: mappedUsers,
      isLoading: false,
    })
  }

  handleFilter = (event) => {
    const { value } = event.target
    const field = value.trim().toLowerCase()
    const callback = user => (
      user.name.toLowerCase().includes(field)
        || (user.mother && user.mother.toLowerCase().includes(field))
        || (user.father && user.father.toLowerCase().includes(field))
    )

    this.setState(prevState => ({
      usersToShow: prevState.users.filter(callback),
    }))
  }

  handleSort = (field) => {
    const createSorterBy = sortField => (a, b) => {
      switch (typeof a[sortField]) {
        case 'string':
          return a[sortField].localeCompare(b[sortField])

        case 'boolean':
        case 'number':
          return a[sortField] - b[sortField]
          
        default:
          return 0
      }
    }

    const callback = createSorterBy(field)
    this.setState(prevState => ({
      direction: !prevState.direction,
      usersToShow: prevState.direction
        ? prevState.usersToShow.sort(callback).reverse()
        : prevState.usersToShow.sort(callback),
    }))
  }

  handleRowClick = id => this.setState({ selectedRow: id })

  handleButtonClick = () => this.setState(prevState => ({
    isUserAdding: !prevState.isUserAdding,
  }))

  handleAddingUser = (event) => {
    const data = new FormData(event.target)

    console.log(data)

    event.preventDefault()
    this.handleButtonClick()
  }

  render() {
    const {
      isLoading,
      usersToShow,
      selectedRow,
      isUserAdding,
    } = this.state

    return (
      <main>
        <section className="container">
          {
            isLoading
              ? <div className="align-center">Loading..</div>
              : (
                <PeopleTable
                  people={usersToShow}
                  handleInputChange={this.handleFilter}
                  handleSort={this.handleSort}
                  handleRowClick={this.handleRowClick}
                  selectedRow={selectedRow}
                  isUserAdding={isUserAdding}
                  handleButtonClick={this.handleButtonClick}
                />
              )
          }
          {
            isUserAdding && (
              <AddUserWindow
                handleClose={this.handleButtonClick}
                handleSubmit={this.handleAddingUser}
              />
            )
          }
        </section>
      </main>
    )
  }
}
