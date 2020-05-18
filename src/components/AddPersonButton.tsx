import React from 'react';

interface Props {
  errorBorn: boolean;
  errorDied: boolean;
  errorName: boolean;
  bigDifference: boolean;
  validation: (param: string) => void;
  minusDifference: boolean;
}

export const AddPersonButton: React.FC<Props> = ({
  errorBorn,
  errorDied,
  errorName,
  bigDifference,
  validation,
  minusDifference,
}) => (
  <>
    <button
      type="button"
      className="add__button"
      disabled={
        errorBorn || errorDied || errorName || bigDifference || minusDifference
      }
      onClick={() => validation('')}
    >
        Add person
    </button>
    {bigDifference && (
      <span className="error__difference">
        The difference between the year of birth and death should not exceed 150
      </span>
    )}
    {minusDifference && !bigDifference && (
      <span className="error__difference--small">
          Year of birth should be more than death
      </span>
    )}
  </>
);
