import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import classnames from 'classnames';


type PersonRowProps = {
  name: string;
  sex: string;
  born: number;
  died: number;
  mother: string;
  father: string;
  slug: string;

};

export const PersonRow: React.FC<PersonRowProps> = ({slug,name, sex,born,died,mother,father,}) => {
const { personSlug } = useParams();
const history = useHistory();


const handleSelectPerson = (personUrl: string) => {
  history.push({
    pathname: `/people/${personUrl}`,
  });
};

return(
<tr className={classnames('Person', {
  'Person_active': slug === personSlug,
})}
    key={slug}
    onClick={() => handleSelectPerson(slug)}
>


      <td className={sex==='m'
        ? 'man'
        : 'woman'}>{name}</td>

      <td className={sex==='m'
        ? 'man'
        : 'woman'}>
        {sex==='m'
          ? '  male'
          : ' female'}
      </td>
      <td>{born}</td>
      <td>{died}</td>
      <td className='woman'>{mother}</td>
      <td className='man'>{father}</td>
</tr>

);


}
