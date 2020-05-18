import React from 'react';
import cn from 'classnames';

import { PersonName } from './PersonName';

interface Props {
  keysForHeader: string[];
  people: People[];
  selectPerson: (id: number) => void;
  selectedPerson: People[];
}

export const TBody: React.FC<Props> = ({
  keysForHeader,
  people,
  selectPerson,
  selectedPerson,
}) => (
  <tbody>
    {people.map(person => (
      <tr
        className={cn(
          `Person--lived-in-${person.century}`,
          {
            'Person--male': person.sex === 'm',
            'Person--female': person.sex === 'f',
            'Old-birth': person.born && person.born <= 1650,
            'Person--selected':
              selectedPerson.length === 1
              && selectedPerson[0].id === person.id
            ,
          },
        )}
        onClick={() => selectPerson(person.id as number)}
        key={person.name + person.father}
      >
        {keysForHeader.map((key, i) => (
          i === 0 ? (
            <th scope="row" key={key}>{person[key]}</th>
          ) : key === 'name'
            ? (
              <PersonName name={person[key]} sex={person.sex as string} key={key} />
            )
            : (
              <td
                className={cn(
                  {
                    GoodAge: key === 'age'
                        && person.age
                        && person.age >= 65,
                  },
                )}
                key={key}
              >
                {person[key]}
              </td>
            )
        ))}
      </tr>
    ))}
  </tbody>
);
