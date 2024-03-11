import React from 'react';
import { Button } from '../Button/Button';

export const PeopleList = ({
  people = [],
  onRemovePerson = () => { },
  onAddPerson = () => { },
  isSelected = () => { },
}) => (
  <>
    {people.map(person => (
      <tr
        key={person.slug}
        className={isSelected(person)
          ? 'has-background-warning'
          : ''}
      >
        <td>
          {isSelected(person) ? (
            <Button
              className="is-small is-rounded is-danger"
              onClick={() => onRemovePerson(person)}
            >
              <span className="icon is-small">
                <i className="fas fa-minus" />
              </span>
            </Button>
          ) : (
            <Button
              className="is-small is-rounded is-success"
              onClick={() => onAddPerson(person)}
            >
              <span className="icon is-small">
                <i className="fas fa-plus" />
              </span>
            </Button>
          )}
        </td>
        <td>{person.name}</td>
        <td>{person.sex}</td>
        <td>{person.born}</td>
      </tr>
    ))}
  </>
);
