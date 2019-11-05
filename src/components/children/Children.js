import React from 'react';

class Children extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <td style={{ listStyleType: 'none' }}>{children.map(child => <li>{child}</li>)}</td>
    )
  }
}

export default Children;
