import React from 'react';

type Props = {
  message: string;
};

const ErrorPage: React.FC<Props> = ({ message }) => <h2>{message}</h2>;

export default ErrorPage;
