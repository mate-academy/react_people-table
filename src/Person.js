import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';

const Person = ({ item, index }) => {
  const [selectedTr, setSelectedTr] = useState('');

  useEffect(() => {
  }, [selectedTr]);

  return (
    <tr
      className={
        // eslint-disable-next-line no-sequences
        item.sex === 'f' ? 'Person--female' : 'Person--male',
        selectedTr === index ? 'Person--selected' : ''
      }
      onClick={() => setSelectedTr(index)}
    >
      <td>{index + 1}</td>
      <td className={item.born < 1650
        ? 'Person--decoration' : ''}
      >
        {item.name}
      </td>
      <td>{item.sex}</td>
      <td>{item.born}</td>
      <td>{item.died}</td>
      <td className={item.died - item.born >= 65
        ? 'Person--green' : ''}
      >
        {item.died - item.born}
      </td>
      <td className={`Person--lived-in-${Math.ceil(item.died / 100)}`}>
        {Math.ceil(item.died / 100)}
      </td>
      <td>{item.mother}</td>
      <td>{item.father}</td>
    </tr>
  );
};

Person.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropType.object.isRequired,
  index: PropType.number.isRequired,
};

export default Person;
