import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './components/Navigation';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

export const App: React.FC = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);
