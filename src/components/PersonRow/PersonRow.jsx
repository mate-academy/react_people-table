import React, { useState } from 'react';
import { PersonName } from '../PersonName/PersonName';
import { Route, NavLink, Link, useRouteMatch, useLocation } from 'react-router-dom';
import './PersonRow.scss';
import { PeoplePage } from '../PeoplePage/PeoplePage';
import classNames from 'classnames';

export const PersonRow = ({ people }) => {
  const match = useRouteMatch();
  const location = useLocation();
  const [url, setUrl] = useState('');
  const isPersonFound = (parent) => {
    return people.find(person => person.name === parent);
  };

  return (
    <>
      {people.map(person => {
        const { slug, name, sex, born, died, motherName, fatherName } = person;
        return (
          <Route key={slug} path={"/people/:id?"} render={({ match, location }) => (
            <>
              <tr 
              className={classNames({
                "is-selected": slug === url
              })}>
                <td>
                  <PersonName
                    sex={sex}
                    name={name}
                    match={match}
                    slug={slug}
                    location={location}
                    setUrl={setUrl}
                  >
                  </PersonName>
                </td>
                <td>{sex}</td>

                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {isPersonFound(motherName) ?
                  <PersonName
                  sex={isPersonFound(motherName).sex}
                  name={motherName}
                  match={match}
                  slug={isPersonFound(motherName).slug}
                  location={location}
                  setUrl={setUrl}>
                  </PersonName>
                  : <>{motherName}</>
                  }
                </td>
                <td>
                  {isPersonFound(fatherName) ?
                   <PersonName
                   sex={isPersonFound(fatherName).sex}
                   name={fatherName}
                   match={match}
                   slug={isPersonFound(fatherName).slug}
                   location={location}
                   setUrl={setUrl}>
                   </PersonName>
                  : <>{fatherName}</>
                  }
                </td>
              </tr>
            </>
          )}>
          </Route>
        )
      })
      }

    </>
  )
}