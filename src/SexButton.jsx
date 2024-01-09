import React from 'react';
import classNames from 'classnames';
import { Button } from './components/Button';

export const SexButton = ({ sex, setSex, isSelected }) => (
  <Button
    className={classNames({ 'is-info': isSelected })}
    onClick={() => setSex(sex)}
  >
    {sex}
  </Button>
);
