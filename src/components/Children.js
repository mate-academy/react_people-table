import React, { Component } from 'react';

class Children extends Component {
  render() {
    const { children } = this.props;

    return (
      <td style={{ listStyleType: 'none' }}>{children.map(child => <li>{child}</li>)}</td>
    );
  }
}

export default Children;
