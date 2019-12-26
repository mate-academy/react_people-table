import React from 'react';

const createChildId = () => {
  let childId = 0;
  return () => {
    childId++;
    return childId;
  }
}

const Children = (props) => {
  const getChildId = createChildId();
  const { children } = props;

  return (
    <td style={{ listStyleType: 'none' }}>{children.map(child => <li key={getChildId()}>{child}</li>)}</td>
  )
}

export default Children;
