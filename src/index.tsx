import { createRoot } from 'react-dom/client';
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { StateProvider } from './AppContext';
import { FilteringForm } from './components/FilteringForm/FilteringForm';
import { PeoplePage } from './components/PeoplePage';

const root = createRoot(
  document.getElementById('root') as HTMLDivElement,
);

root.render(
  <Router>
    <Routes>
      <Route
        path="/"
        element={(
          <StateProvider>
            <App />
          </StateProvider>
        )}
      >
        <Route
          path="*"
          element={(
            <h1 className="title">
              Page not found
            </h1>
          )}
        />

        <Route
          index
          element={(
            <h1 className="title">
              Home Page
            </h1>
          )}
        />

        <Route
          path="home"
          element={<Navigate to="/" replace />}
        />

        <Route path="/people">
          <Route
            index
            element={<PeoplePage />}
          />

          <Route
            path=":selectedPerson"
            element={<PeoplePage />}
          />
        </Route>

        <Route
          path="?sex"
          element={<FilteringForm />}
        />

        {/* <Route
          path="?century"
          element={<FilteringForm />}
        /> */}
      </Route>
    </Routes>
  </Router>,
);
