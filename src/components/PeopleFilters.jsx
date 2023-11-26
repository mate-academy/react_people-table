import React from 'react';
import cn from 'classnames';
import { Button } from './Button';
import { FILTERBYSEX } from '../constants';

export const PeopleFilters = ({
  setFilterBy,
  filterBy,
  setQuery,
}) => {
  return (
    <>
      <Button
        onClick={() => {
          setFilterBy(FILTERBYSEX.ALL);
        }}
        className={cn({
          'has-text-danger': filterBy === FILTERBYSEX.ALL,
        })}
      >
        all
      </Button>

      <Button
        onClick={() => {
          setFilterBy(FILTERBYSEX.M);
        }}
        className={cn({
          'has-text-danger': filterBy === FILTERBYSEX.M,
        })}
      >
        m
      </Button>

      <Button
        onClick={() => {
          setFilterBy(FILTERBYSEX.F);
        }}
        className={cn({
          'has-text-danger': filterBy === FILTERBYSEX.F,
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
};
