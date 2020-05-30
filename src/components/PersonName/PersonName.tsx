import React from 'react';
import { ModifiedPerson } from '../../helpers/api';
import { Link, useLocation } from 'react-router-dom';
import ClassNames from 'classnames';
import './PersonName.css';

type Props = {
  person: ModifiedPerson;
}

const PersonName:React.FC<Props> = ({ person }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);


  const handleClickOnName = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({behavior: "smooth", block: "center"});
  }

  return (
    <Link
      className={ClassNames('person__name',
        {'person__name--female': person.sex === 'f'},
        {'person__name--male': person.sex === 'm'}
      )}
      to={{
        pathname: `/people/${person.slug}`,
        search: `${searchParams}`,
      }}
      onClick={() => handleClickOnName(person.slug)}
    >
      {person.name}
    </Link>
  )
}

export default PersonName;
