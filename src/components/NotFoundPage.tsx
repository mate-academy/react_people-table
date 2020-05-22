import React from 'react';
// import { Redirect } from 'react-router-dom';

// type Props = {
//   match: Match;
// };

// export const Home: React.FC<Props> = ({ match }) => {
//   if (match.params.home === 'home') {
//     return <Redirect to="/" />;
//   }

//   return (
//     <h2>Home page</h2>
//   );
// };

export const NotFoundPage = () => (
  <h1>Page not found</h1>
);
