import React from 'react';
import propTypes from 'prop-types';
import './People.css';

const personRowClass = (age, sex, century, children) => {
  let result = 'person';

  result += sex === 'f' ? ' person--female' : ' person--male';
  result += age > 65 ? ' green_border' : '';
  result += ` person--lived-in-${century}`;
  result += children !== undefined && (
    sex === 'f'
      ? ' person--mother'
      : ' person--father'
  );

  return result;
};

const personClassNameStyle = (died, born) => {
  let result = '';

  if (born < 1650) {
    result += ' born-before-1650';
  }

  if (died > 1800) {
    result += ' died-after-1800';
  }

  return result;
};

const calculateAge = (died, born) => died - born;

const calculateCentury = died => Math.ceil(died / 100);

// eslint-disable-next-line react/prop-types
const People = ({ humanData }) => (
  <tr className={
    personRowClass(
      calculateAge(humanData.died, humanData.born),
      humanData.sex,
      calculateCentury(humanData.died),
      humanData.children
    )
  }
  >
    <td>id</td>
    <td className={personClassNameStyle(humanData.died, humanData.born)}>
      {humanData.name}
    </td>
    <td className="centered-column">{humanData.sex}</td>
    <td>{humanData.born}</td>
    <td>{humanData.died}</td>
    <td>{calculateAge(humanData.died, humanData.born)}</td>
    <td className="centered-column">{calculateCentury(humanData.died)}</td>
    <td>{humanData.mother}</td>
    <td>{humanData.father}</td>
    <td>{humanData.children !== undefined ? humanData.children.name : ''}</td>
  </tr>
);

propTypes.People = {
  humanData: propTypes.shape({
    name: propTypes.string,
    sex: propTypes.string,
    born: propTypes.number,
    died: propTypes.number,
    mother: propTypes.string,
    father: propTypes.string,
  }),
};

export default People;
