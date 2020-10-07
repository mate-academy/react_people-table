import React, {useState } from 'react';
import { PersonName } from '../PersonName/PersonName';
import { Route } from 'react-router-dom';
import './PersonRow.scss';
import classNames from 'classnames';

export const PersonRow = ({ people, idSelected, setIdSelected }) => {
  const [url, setUrl] = useState('');

  const isPersonFound = (parent) => {
    return people.find(person => person.name === parent);
  };

  return (
    <>
      {people.map(person => {
        const { slug, name, sex, born, died, motherName, fatherName } = person;
        return (
          <Route key={slug} path={`/people/:id?`} render={({ match, location }) => (
            <>
              <tr
              className={classNames({
                "is-selected": slug === url
              })}>
                <td className={classNames({
                  table__cell_active: idSelected === 'name'
                 })}>
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
                <td
                className={classNames({
                  table__cell_active: idSelected === 'sex'
                 })}
                >{sex}</td>
                <td
                 className={classNames({
                  table__cell_active: idSelected === 'born'
                 })}
                 >{born}</td>
                <td
                 className={classNames({
                  table__cell_active: idSelected === 'died'
                 })}
                 >{died}</td>
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