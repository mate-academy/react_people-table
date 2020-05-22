import React from 'react';
import Nav from './components/Nav';
import Main from './components/Main';
import './App.scss';

const App = () => (
  <div className="App">
    <header>
      <Nav />
    </header>

    <Main />
    <footer className="App-Footer">
      &copy;Andreas Just 2020
    </footer>
  </div>
);

export default App;
