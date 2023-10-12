import React, { useState } from 'react';
import { Button } from './Button';
import cn from 'classnames';
import { SORTBY, FILTERBYSEX } from '../App';

export const PeopleFilters = ({
  setFilterBy,
  filterBy,
  setQuery,
}) => {
  return (
    <>
      <Button
        onClick={() => {
          setFilterBy(FILTERBYSEX.ALL)
        }}
        className={cn({
          'has-text-danger': filterBy === FILTERBYSEX.ALL
        })}
      >
        all
      </Button>

      <Button
        onClick={() => {
          setFilterBy(FILTERBYSEX.M)
        }}
        className={cn({
          'has-text-danger': filterBy === FILTERBYSEX.M,
        })}
      >
        m
      </Button>

      <Button
        onClick={() => {
          setFilterBy(FILTERBYSEX.F)
        }}
        className={cn({
          'has-text-danger': filterBy === FILTERBYSEX.F
        })}
      >
        f
      </Button>

      <input
        type="search"
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
    </>
  );
}
