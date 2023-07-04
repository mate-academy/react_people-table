import { useState } from 'react';
import classNames from 'classnames';
import peopleFromServer from './people.json';
import { Button } from './components/Button/Button';

export const App = ({ user }) => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  function isSelected(person) {
    return person.slug === selectedPerson?.slug;
  }

  return (
    <div className="box">
      <table className="table is-striped is-narrow">
        <caption className="title is-5 has-text-info">
          {selectedPerson?.name || '-'}
        </caption>

        <thead>
          <tr>
            <th> </th>
            <th>
              name
            </th>
            <th>sex</th>
            <th>born</th>
          </tr>
        </thead>

        <tbody>
          {peopleFromServer.map(person => (
            <tr
              key={person.slug}
              className={classNames({
                'has-background-warning': isSelected(person),
              })}
            >
              <td>
                {isSelected(person) ? (
                  <Button
                    className="is-danger is-small is-rounded"
                    onClick={() => setSelectedPerson(null)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-minus" />
                    </span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => setSelectedPerson(person)}
                    className="is-success is-small is-rounded"
                  >
                    <span className="icon is-small">
                      <i className="fas fa-plus" />
                    </span>
                  </Button>
                )}
              </td>

              <td
                className={classNames('Person__name', {
                  'has-text-link': person.sex === 'm',
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
