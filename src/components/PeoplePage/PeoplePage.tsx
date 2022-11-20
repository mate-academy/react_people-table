import React, { useContext, useEffect } from 'react';
import {
  DispatchContext,
  ReducerActions,
  StateContext,
} from '../../AppContext';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { FilteringForm } from '../FilteringForm';

export const PeoplePage: React.FC = () => {
  const dispath = useContext(DispatchContext);
  const {
    people,
    isPeopleLoading,
    hasPeopleLoadingError,
  } = useContext(StateContext);

  const getPeopleFromApi = async () => {
    dispath({
      type: ReducerActions.setPeople,
      payload: null,
    });

    dispath({
      type: ReducerActions.setIsPeopleLoading,
      payload: true,
    });

    await getPeople()
      .then(res => {
        const peopleData: Person[] = res.map((person: Person) => {
          const mother = res.find((
            { name: motherName }: Person,
          ) => motherName === person.motherName);

          const father = res.find((
            { name: fatherName }: Person,
          ) => fatherName === person.fatherName);

          if (mother !== undefined && father !== undefined) {
            return {
              ...person,
              mother,
              father,
            };
          }

          if (mother !== undefined) {
            return {
              ...person,
              mother,
            };
          }

          if (father !== undefined) {
            return {
              ...person,
              father,
            };
          }

          return person;
        });

        dispath({
          type: ReducerActions.setPeople,
          payload: peopleData,
        });
      })
      .catch(() => dispath({
        type: ReducerActions.setHasPeopleLoadingError,
        payload: true,
      }))
      .finally(() => dispath({
        type: ReducerActions.setIsPeopleLoading,
        payload: false,
      }));
  };

  useEffect(() => {
    getPeopleFromApi();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse1">
          {/* <div className="box table-container"> */}
          {isPeopleLoading && <Loader />}

          {hasPeopleLoadingError && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {people !== null
          && people.length === 0
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people !== null
          && people.length !== 0
          && (
            <>
              <PeopleTable people={people} />
              <FilteringForm />
            </>
          )}
        </div>
      </div>
    </>
  );
};
