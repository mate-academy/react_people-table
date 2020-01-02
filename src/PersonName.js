import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { getHighlightedText } from './highlightText';

const PersonName = ({ names, highlight, people }) => (
  <span>
    {(names || []).map((name, i) => {
      const { sex } = people.find(person => person.name === name) || {};
      const separator = i < names.length - 1 ? ', ' : '';

      return (
        <React.Fragment key={name}>
          <span
            className={cn({
              'Person--female': sex === 'f',
              'Person--male': sex === 'm',
            })}
          >
            {getHighlightedText(name, highlight)}
          </span>
          {name && separator}
        </React.Fragment>
      );
    })}
  </span>
);

PersonName.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
  })).isRequired,
  names: PropTypes.arrayOf(PropTypes.string.isRequired),
  highlight: PropTypes.string.isRequired,
};

PersonName.defaultProps = {
  names: [],
};

export default PersonName;
