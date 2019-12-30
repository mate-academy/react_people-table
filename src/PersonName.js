import React, { } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const PersonName = ({ person, sex }) => (
  <>

    <span
      className={cn(
        { male: sex === 'm' },
        { female: sex === 'f' }
      )}
    >
      {person}
    </span>
  </>
);

PersonName.propTypes = {
  person: PropTypes.string,
  sex: PropTypes.string,
};
PersonName.defaultProps = {
  person: '',
  sex: '',
};
export default PersonName;
