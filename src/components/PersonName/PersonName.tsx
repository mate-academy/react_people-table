import React from 'react';
import { ModifiedPerson } from '../../helpers/api';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import './PersonName.css';

type Props = {
  person: ModifiedPerson;
}

const PersonName:React.FC<Props> = ({ person }) => {
  return (
    <Link
      className={ClassNames('person__name',
        {'person__name--female': person.sex === 'f'},
        {'person__name--male': person.sex === 'm'}
      )}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  )
}

export default PersonName;
