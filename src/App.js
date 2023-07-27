import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import './assets/scss/reset.scss';
import './assets/scss/variables.scss';
import routes from './routes';
import Programmation from './pages/programmation/Programmation';


const App = () => {
  const isLoggedIn = !!localStorage.getItem('username');

  return (
    <div className="App">
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.protected && !isLoggedIn ? (
                  <Navigate to="/login" replace />
                ) : (
                  <route.component />
                )
              }
            />
          ))}
          {/* Ajoutez la route pour 'Programmation' ici */}
          <Route path="/programmation/:index" element={<Programmation />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
