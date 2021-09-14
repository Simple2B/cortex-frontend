import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Kiosk from './components/Kiosk/Kiosk';
import Login from './components/Login/Login';
import PasswordChoose from './components/PasswordChoose/PasswordChoose';
import Patients from './components/Patients/Patients';
import Queue from './components/Queue/Queue';
import Reports from './components/Reports/Reports';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/password-choose">
            <PasswordChoose />
          </Route>
          <Route path="/kiosk">
            <Kiosk />
          </Route>
          <Route path="/reports">
            <Reports />
          </Route>
          <Route path="/patients">
            <Patients />
          </Route>
          <Route path="/queue">
            <Queue />
          </Route>
          <Route path="/">
            <Login />
          </Route>

        </Switch>
      </Router>

    </div>
  );
}

export default App;
