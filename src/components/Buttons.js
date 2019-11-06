import React, { Component } from 'react';

class Buttons extends Component {
  render() {
    const { sortTypeChange } = this.props;

    return (
      <div className="ui eight buttons">
        <button
          type="submit"
          className="ui button"
          onClick={() => sortTypeChange('name')}
        >
          Sort by name
        </button>
        <button
          type="submit"
          className="ui button"
          onClick={() => sortTypeChange('id')}
        >
          Sort by id
        </button>
        <button
          type="submit"
          className="ui button"
          onClick={() => sortTypeChange('sex')}
        >
          Sort by sex
        </button>
        <button
          type="submit"
          className="ui button"
          onClick={() => sortTypeChange('born')}
        >
          Sort by born
        </button>
        <button
          type="submit"
          className="ui button"
          onClick={() => sortTypeChange('died')}
        >
          Sort by died
        </button>
        <button
          type="submit"
          className="ui button"
          onClick={() => sortTypeChange('age')}
        >
          Sort by age
        </button>
        <button
          type="submit"
          className="ui button"
          onClick={() => sortTypeChange('century')}
        >
          Sort by century
        </button>
        <button
          type="submit"
          className="ui button"
          onClick={() => sortTypeChange('all')}
        >
          Reset
        </button>
      </div>
    );
  }
}

export default Buttons;
