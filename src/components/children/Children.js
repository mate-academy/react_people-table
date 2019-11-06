import React from 'react';

const Children = (props) => {
  const { children } = props;
  
  return (
    <td style={{ listStyleType: 'none' }}>{children.map(child => <li>{child}</li>)}</td>
  )
}

export default Children;
