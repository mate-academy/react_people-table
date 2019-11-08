import React from 'react';
import PropTypes from 'prop-types';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: props.defaultValue,
    };
  }

  onInputChange = (event) => {
    this.setState({
      search: event.target.value,
    });
    this.props.onValueChanged(event.target.value);
  }

  render() {
    return (
      <div className="ui icon input">
        <input
          type="text"
          placeholder="Who are you looking for?"
          onChange={this.onInputChange}
        />
        <i aria-hidden="true" className="search circular inverted link icon" />
      </div>
    );
  }
}

Filter.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  onValueChanged: PropTypes.func.isRequired,
};

export default Filter;
