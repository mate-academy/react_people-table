import React from 'react';
import cn from 'classnames';

import { PersonName } from './PersonName';

interface Props {
  keysForHeader: string[];
  people: People[];
  selectPerson: (id: number) => void;
  selectedPerson: number;
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
            'Person--selected': selectedPerson === person.id,
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
              <PersonName
                name={person[key]}
                sex={person.sex as string}
                key={key}
                born={person.born as number}
              />
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
