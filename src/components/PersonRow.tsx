import React from 'react';
import {useParams, useHistory, useLocation} from "react-router-dom";
import classnames from 'classnames';


type PersonRowProps = {
  person:Person;

};

export const PersonRow: React.FC<PersonRowProps> = ({person}) => {
  const {personSlug} = useParams();
  const history = useHistory();
  const location = useLocation();
  const{ name, sex, born, died, motherName, fatherName, slug} = person;


  const handleSelectPerson = (personUrl: string) => {
    history.push({
      search:location.search,
      pathname: `/people/${personUrl}`,
    });
  };

  return (
    <tr className={classnames('Person', {
      'Person_active': slug === personSlug,
    })}
        key={slug}
        onClick={() => handleSelectPerson(slug)}
    >


      <td className={sex === 'm'
        ? 'man'
        : 'woman'}>{name}</td>

      <td className={sex === 'm'
        ? 'man'
        : 'woman'}>
        {sex === 'm'
          ? '  male'
          : ' female'}
      </td>
      <td>{born}</td>
      <td>{died}</td>
      <td className='woman'>{motherName}</td>
      <td className='man'>{fatherName}</td>
    </tr>

  );


}
