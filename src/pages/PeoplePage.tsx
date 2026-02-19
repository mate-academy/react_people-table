import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api/people';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { PersonWithParents } from '../types/Person';

type SortBy = 'name' | 'sex' | 'born' | 'died';
type SortOrder = 'asc' | 'desc';

const VALID_SORT_BY: SortBy[] = ['name', 'sex', 'born', 'died'];

function isValidSortBy(value: string | null): value is SortBy {
  return !!value && VALID_SORT_BY.includes(value as SortBy);
}

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export const PeoplePage: React.FC = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [people, setPeople] = useState<PersonWithParents[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const queryFromUrl = searchParams.get('query') ?? '';
  const sortByFromUrl = searchParams.get('sortBy');
  const sortOrderFromUrl =
    (searchParams.get('sortOrder') as SortOrder | null) ?? null;

  const [queryDraft, setQueryDraft] = useState(queryFromUrl);

  // keep input synced on initial load / back-forward navigation
  useEffect(() => {
    setQueryDraft(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  // debounce URL update for query (500ms)
  useEffect(() => {
    const id = window.setTimeout(() => {
      const next = new URLSearchParams(searchParams);

      const value = queryDraft.trim();

      if (value) {
        next.set('query', value);
      } else {
        next.delete('query');
      }

      setSearchParams(next, { replace: true });
    }, 500);

    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryDraft]);

  const preparedPeople = useMemo(() => {
    const q = normalize(queryFromUrl);

    let result = people;

    if (q) {
      result = result.filter(p => {
        const name = normalize(p.name);
        const motherName = normalize(p.motherName ?? '');
        const fatherName = normalize(p.fatherName ?? '');

        return (
          name.includes(q) || motherName.includes(q) || fatherName.includes(q)
        );
      });
    }

    if (isValidSortBy(sortByFromUrl)) {
      const order: SortOrder = sortOrderFromUrl === 'desc' ? 'desc' : 'asc';
      const dir = order === 'asc' ? 1 : -1;

      result = [...result].sort((a, b) => {
        const field = sortByFromUrl;

        const av = a[field];
        const bv = b[field];

        if (typeof av === 'number' && typeof bv === 'number') {
          return (av - bv) * dir;
        }

        return String(av).localeCompare(String(bv)) * dir;
      });
    }

    return result;
  }, [people, queryFromUrl, sortByFromUrl, sortOrderFromUrl]);

  // Highlight: only if slug exists in full people list
  const selectedSlug = useMemo(() => {
    if (!slug) return undefined;
    return people.some(p => p.slug === slug) ? slug : undefined;
  }, [slug, people]);

  const onSort = (field: SortBy) => {
    const next = new URLSearchParams(searchParams);
    const currentBy = next.get('sortBy');
    const currentOrder = (next.get('sortOrder') as SortOrder | null) ?? null;

    if (currentBy !== field) {
      next.set('sortBy', field);
      next.set('sortOrder', 'asc');
    } else {
      const nextOrder: SortOrder = currentOrder === 'asc' ? 'desc' : 'asc';
      next.set('sortOrder', nextOrder);
    }

    setSearchParams(next);
  };

  return (
    <div>
      <h1 className="title">Peope page</h1>

      <div className="field">
        <label className="label" htmlFor="query">
          Filter
        </label>
        <div className="control">
          <input
            id="query"
            type="text"
            className="input"
            placeholder="Type to search by name / mother / father..."
            value={queryDraft}
            onChange={e => setQueryDraft(e.target.value)}
          />
        </div>
      </div>

      {isLoading && <Loader />}
      {hasError && (
        <div className="notification is-danger">Failed to load people</div>
      )}

      {!isLoading && !hasError && (
        <PeopleTable
          people={preparedPeople}
          selectedSlug={selectedSlug}
          sortBy={sortByFromUrl}
          sortOrder={sortOrderFromUrl}
          onSort={onSort}
        />
      )}
    </div>
  );
};
