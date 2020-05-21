import React from 'react';

interface Props {
  nameValue: string;
  handleInputName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorName: boolean;
  bornValue: string;
  handleInputAgeInfo: (e: React.ChangeEvent<HTMLInputElement>, param: string) => void;
  errorBorn: boolean;
  diedValue: string;
  errorDied: boolean;
  blurValidation: (param: string) => void;
}

export const AddPersonInputs: React.FC<Props> = ({
  nameValue,
  handleInputName,
  errorName,
  bornValue,
  handleInputAgeInfo,
  errorBorn,
  diedValue,
  errorDied,
  blurValidation,
}) => (
  <>
    <label className="add__inp">
        Name:
      <input
        type="text"
        value={nameValue}
        onChange={e => handleInputName(e)}
        placeholder=" Write the name"
        onBlur={() => blurValidation('name')}
      />
    </label>
    {errorName && (<span className="error__name">Please, write correctly name</span>)}
    <label className="add__inp">
        Born:
      <input
        type="text"
        value={bornValue}
        onChange={e => handleInputAgeInfo(e, 'born')}
        placeholder=" Year of born  'XXXX'"
        onBlur={() => blurValidation('born')}
      />
    </label>
    {errorBorn && (<span className="error__born">Please, write correctly born year</span>)}
    <label className="add__inp">
        Died:
      <input
        type="text"
        value={diedValue}
        onChange={e => handleInputAgeInfo(e, 'died')}
        placeholder=" Year of died  'XXXX'"
        onBlur={() => blurValidation('died')}
      />
    </label>
    {errorDied && (<span className="error__year">Please, write correctly died year</span>)}
  </>
);
