import React from 'react';

interface Props {
  genderValue: string;
  chooseGender: (param: string) => void;
  errorGender: boolean;
}

export const SexSelect: React.FC<Props> = ({ genderValue, chooseGender, errorGender }) => {
  return (
    <div className="gender__container">
      <label className="add__rad">
Male
        <input
          type="radio"
          checked={genderValue === 'm'}
          className="radio__btn"
          onChange={() => chooseGender('m')}
        />
      </label>
      <label className="add__rad">
Female
        <input
          type="radio"
          checked={genderValue === 'f'}
          className="radio__btn"
          onChange={() => chooseGender('f')}
        />
      </label>
      {errorGender && (<p className="error__gender">Please, choose gender</p>)}
    </div>
  );
};
