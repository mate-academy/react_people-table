import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  person?: Person | null;
  nameFallback?: string; // used when parent not found
};

export const PersonName: React.FC<Props> = ({ person, nameFallback }) => {
  const location = useLocation();

  if (!person) {
    return <span className="PersonName--plain">{nameFallback ?? ''}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}${location.search}`}
      className={classNames({
        'PersonName--m': person.sex === 'm',
        'PersonName--f': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
