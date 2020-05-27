import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import cn from 'classnames';


type Props = {
  person: Person;
};

interface Person {
  id: number;
  name: string;
  sex: string;
  fatherName: string;
  motherName: string;
  father: object | string;
  mother: object | string;
  born: number;
  died: number;
  slug: string;
  age: number;
  century: number;
}

const PersonRow = ({ person }: Props) => {
  const history = useHistory();
  const { tabId } = useParams();

  const handleChangePathParam = (slug: string) => {
    history.push({
      pathname: `/people/${slug}`,
    });
  };

  return (
    <tr
      className={cn('Person', {
        'Person-active': tabId === person.slug,
      })}
      onClick={() => handleChangePathParam(person.slug)}
    >
      <td className={person.sex === 'm' ? 'male' : 'female'}>{person.name}</td>
      <td>{person.sex.toUpperCase()}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td className={person.father === 'none' ? 'none' : 'male'}>
        {person.fatherName}
      </td>
      <td className={person.mother === 'none' ? 'none' : 'female'}>
        {person.motherName}
      </td>
      <td>{person.age}</td>
      <td>{person.century}</td>
    </tr>
  );
};

export default PersonRow;
