import React, { } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const PersonName = ({ person, kids, mother, father }) => (
  <>
    {kids && (
    <>
      {kids.map(child => (
        <div
          key={child.name}
          className={cn(
            { male: child.sex === 'm' },
            { female: child.sex === 'f' }
          )}
        >
          {child.name}
        </div>
      ))}
    </>
    )}
    {person && (
      <span
        className={cn(
          { male: person.sex === 'm' },
          { female: person.sex === 'f' }
        )}
      >
        {person.name}
      </span>
    )}
    {mother && (
      <span
        className={cn(
          'female'
        )}
      >
        {mother}
      </span>
    )}
    {father && (
      <span
        className={cn(
          'male'
        )}
      >
        {father}
      </span>
    )}
  </>
);

PersonName.propTypes = {
  person: PropTypes.objectOf(PropTypes.any),
  kids: PropTypes.arrayOf(PropTypes.any),
  mother: PropTypes.string,
  father: PropTypes.string,
};
PersonName.defaultProps = {
  person: {},
  kids: [],
  mother: '',
  father: '',
};
export default PersonName;
