import React, { } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { People } from './interface';
import PersonRow from './PersonRow';

type Props = {
  people: People[];
  handlSordByName: Function;
};

const PeopleTable: React.FC<Props> = ({ people, handlSordByName }) => {
  const location = useLocation();

  return (
    <>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th
              className={classNames({ isActive: location.search === '?sortBy=name' })}
              scope="col"
              onClick={() => handlSordByName('name')}
            >
name
            </th>
            <th
              className={classNames({ isActive: location.search === '?sortBy=sex' })}
              scope="col"
              onClick={() => handlSordByName('sex')}
            >
sex
            </th>
            <th
              className={classNames({ isActive: location.search === '?sortBy=born' })}
              scope="col"
              onClick={() => handlSordByName('born')}
            >
born
            </th>
            <th
              className={classNames({ isActive: location.search === '?sortBy=died' })}
              scope="col"
              onClick={() => handlSordByName('died')}
            >
died
            </th>
            <th scope="col">mother</th>
            <th scope="col">father</th>
          </tr>
        </thead>
        <PersonRow people={people} />
      </table>
    </>
  );
};

export default PeopleTable;
