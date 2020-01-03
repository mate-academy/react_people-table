import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';

const PeopleRow = ({ currentPerson, tableHeaders, highlightedValue }) => {
  const { born, age, sex, century, name } = currentPerson;
  const historyUse = useHistory();
  const matchUse = useRouteMatch();
  const locationUse = useLocation();
  const path = `${matchUse.path}/${name.replace(/\W/g, '-').toLowerCase()}`;

  const setHistory = () => {
    historyUse.push({
      pathname: path,
      search: locationUse.search,
    });
  };

  const highlightText = (text) => {
    if (!highlightedValue) {
      return text;
    }

    const parts = text.toString().split(
      new RegExp(`(${highlightedValue})`, 'gi')
    );

    return parts.map((part, i) => (
      <Fragment key={`${part + i}`}>
        {part.toLowerCase() === highlightedValue.toLowerCase()
          ? <span style={{ backgroundColor: 'green' }}>{part}</span>
          : part}
      </Fragment>
    ));
  };

  return (
    <tr
      className={ClassNames(
        'person',
        sex === 'm' ? 'person--male' : 'person--female',
        `person--lived-in-${century}`,
        { 'person--selected': locationUse.pathname === path },
      )}
      onClick={setHistory}
    >
      {tableHeaders.map(({ code }) => (
        <td
          key={code}
          className={ClassNames({
            'person--born-before-1650': code === 'name' && born < 1650,
            'person--age-over-65': code === 'age' && age >= 65,
          })}
        >
          {highlightText(currentPerson[code])}
        </td>
      ))}
    </tr>
  );
};

PeopleRow.propTypes = {
  currentPerson: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])
  ),
  tableHeaders: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.string
    )
  ),
  highlightedValue: PropTypes.string,
}.isRequired;

export default PeopleRow;
