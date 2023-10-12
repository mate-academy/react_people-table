import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { SORTBY, FILTERBYSEX } from '../App';
import { Button } from './Button';


function isSelected(selected, current) {
  return selected === current;
}

export const PeopleTable = ({
  setSortBy,
  sortBy,
  peopleToRender,
  selectedPeople,
  setSelectedPeople
}) => {

  return (
    <table className="table is-striped is-narrow">
    <thead>
      <th>
        <Button
          className={cn({
            'has-background-warning': isSelected(Object.keys(sortBy)[0], SORTBY.NAME),
          })}
          onClick={() => {
            setSortBy({
              [SORTBY.NAME]: sortBy[SORTBY.NAME] ? 'DESC' : 'ASC',
            })
          }}
        >
          name
        </Button>
      </th>
      <th>
        <Button
          className={cn({
            'has-background-warning': isSelected(Object.keys(sortBy)[0], SORTBY.SEX),
          })}
          onClick={() => {
            setSortBy({
              [SORTBY.SEX]: sortBy[SORTBY.SEX] ? 'DESC' : 'ASC',
            })
          }}
        >
          sex
        </Button>
      </th>
      <th>
        <Button
          className={cn({
            'has-background-warning': isSelected(Object.keys(sortBy)[0], SORTBY.BORN),
          })}
          onClick={() => {
            setSortBy({
              [SORTBY.BORN]: sortBy[SORTBY.BORN] ? 'DESC' : 'ASC',
            })
          }}
        >
          born
        </Button>
      </th>
    </thead>

    <tbody>
      {peopleToRender.map((person) => {
        const isSelected = selectedPeople.includes(person);

        return (
          <tr
            key={person.slug}
            onClick={() => {
              isSelected
                ? setSelectedPeople(selectedPeople.filter(p => p.slug !== person.slug))
                : setSelectedPeople([...selectedPeople, person])
            }}
            className={cn({
              'has-background-warning': isSelected,
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
                  <i class="fa-solid fa-skull-crossbones"></i>
                </Button>
            ) : (
              <Button>
                <i class="fa-solid fa-circle-plus"></i>
              </Button>
            )}
          </tr>
        )
      })}
    </tbody>
  </table>
  )
}
