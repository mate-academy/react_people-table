import React from 'react';
import cn from 'classnames';
import { SORTBY } from '../constants';
import { Button } from './Button';

function isSelected(selected, current) {
  return selected === current;
}

export const PeopleTable = ({
  setSortBy,
  sortBy,
  peopleToRender,
  selectedPeople,
  setSelectedPeople,
}) => (
  <table className="table is-striped is-narrow">
    <thead>
      <th>
        <Button
          className={cn({
            'has-background-warning': isSelected(
              Object.keys(sortBy)[0],
              SORTBY.NAME,
            ),
          })}
          onClick={() => {
            setSortBy({
              [SORTBY.NAME]: sortBy[SORTBY.NAME] ? 'DESC' : 'ASC',
            });
          }}
        >
          name
        </Button>
      </th>
      <th>
        <Button
          className={cn({
            'has-background-warning': isSelected(
              Object.keys(sortBy)[0],
              SORTBY.SEX,
            ),
          })}
          onClick={() => {
            setSortBy({
              [SORTBY.SEX]: sortBy[SORTBY.SEX] ? 'DESC' : 'ASC',
            });
          }}
        >
          sex
        </Button>
      </th>
      <th>
        <Button
          className={cn({
            'has-background-warning': isSelected(
              Object.keys(sortBy)[0],
              SORTBY.BORN,
            ),
          })}
          onClick={() => {
            setSortBy({
              [SORTBY.BORN]: sortBy[SORTBY.BORN] ? 'DESC' : 'ASC',
            });
          }}
        >
          born
        </Button>
      </th>
    </thead>

    <tbody>
      {peopleToRender.map((person) => {
        const isPersonSelected = selectedPeople.includes(person);

        return (
          <tr
            key={person.slug}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              isPersonSelected
                ? setSelectedPeople(selectedPeople.filter(p => (
                  p.slug !== person.slug
                )))
                : setSelectedPeople([...selectedPeople, person]);
            }}
            className={cn({
              'has-background-warning': isPersonSelected,
            })}
          >
            <td>{person.name}</td>
            <td
              className={cn({
                'has-text-danger': person.sex === 'f',
                'has-text-link': person.sex === 'm',
              })}
            >
              {person.sex}
            </td>
            <td>{person.born}</td>
            {isSelected ? (
              <Button>
                <i className="fa-solid fa-skull-crossbones" />
              </Button>
            ) : (
              <Button>
                <i className="fa-solid fa-circle-plus" />
              </Button>
            )}
          </tr>
        );
      })}
    </tbody>
  </table>
);
