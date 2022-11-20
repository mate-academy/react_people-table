import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { CenturyFilterLink } from '../CenturyFilterLink';

export const FilteringForm: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handelFilterSearchURL = (filterType: string, value: string) => {
    if (filterType === 'sex' || filterType === 'query') {
      const prevValue = searchParams.get(filterType);

      if (!prevValue) {
        searchParams.append(filterType, value);
        setSearchParams(searchParams);

        return;
      }

      if (!value) {
        searchParams.delete(filterType);
        setSearchParams(searchParams);

        return;
      }

      searchParams.set(filterType, value);
      setSearchParams(searchParams);
    }

    if (filterType === 'century') {
      const prevValue = searchParams.getAll(filterType);

      if (prevValue.length === 0) {
        searchParams.append(filterType, value);
        setSearchParams(searchParams);

        return;
      }

      const newCenturyValue = prevValue.includes(value)
        ? prevValue.filter((century: string) => century !== value)
        : [...prevValue, value];

      searchParams.delete(filterType);

      if (!newCenturyValue.length) {
        setSearchParams(searchParams);

        return;
      }

      newCenturyValue.forEach(
        (century: string) => searchParams.append(filterType, century),
      );

      setSearchParams(searchParams);
    }
  };

  const resetAllCenturies = (event: React.SyntheticEvent) => {
    event.preventDefault();
    searchParams.delete('century');
    setSearchParams(searchParams);
  };

  const resetAllFilter = (event: React.SyntheticEvent) => {
    event.preventDefault();
    searchParams.delete('sex');
    searchParams.delete('century');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  return (
    <div className="column is-7-tablet is-narrow-desktop">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          <Link
            className={cn({ 'is-active': searchParams.get('sex') === '' })}
            to={{ search: '' }}
            onClick={(event: React.SyntheticEvent) => {
              event.preventDefault();
              handelFilterSearchURL('sex', '');
            }}
          >
            All
          </Link>

          <Link
            className={cn({ 'is-active': searchParams.get('sex') === 'm' })}
            to={{ search: '?sex=m' }}
            onClick={(event: React.SyntheticEvent) => {
              event.preventDefault();
              handelFilterSearchURL('sex', 'm');
            }}
          >
            Male
          </Link>

          <Link
            className={cn({ 'is-active': searchParams.get('sex') === 'f' })}
            to={{ search: '?sex=f' }}
            onClick={(event: React.SyntheticEvent) => {
              event.preventDefault();
              handelFilterSearchURL('sex', 'f');
            }}
          >
            Female
          </Link>
        </p>

        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              data-cy="NameFilter"
              className="input"
              type="text"
              placeholder="Search"
              value={searchParams.get('query') || ''}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handelFilterSearchURL('query', event.target.value);
              }}
            />
            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              <CenturyFilterLink
                century="16"
                handelCentury={handelFilterSearchURL}
              />
              <CenturyFilterLink
                century="17"
                handelCentury={handelFilterSearchURL}
              />
              <CenturyFilterLink
                century="18"
                handelCentury={handelFilterSearchURL}
              />
              <CenturyFilterLink
                century="19"
                handelCentury={handelFilterSearchURL}
              />
              <CenturyFilterLink
                century="20"
                handelCentury={handelFilterSearchURL}
              />
            </div>
            <div className="level-right ml-4">
              <Link
                data-cy="centuryALL"
                className={cn(
                  'button',
                  { 'is-success': searchParams.getAll('century').length === 0 },
                )}
                to={{ search: '' }}
                onClick={resetAllCenturies}
              >
                All
              </Link>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <Link
            className="button is-link is-outlined is-fullwidth"
            to={{ search: '' }}
            onClick={resetAllFilter}
          >
            Reset all filters
          </Link>
        </div>
      </nav>
    </div>
  );
};
