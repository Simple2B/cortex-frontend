import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import Kiosk from './components/Kiosk/Kiosk';
import Login from './components/Login/Login';
import PasswordChoose from './components/PasswordChoose/PasswordChoose';
import PatientRegistration from './components/PatientRegistration/PatientRegistration';
import Patients from './components/Patients/Patients';
import Queue from './components/Queue/Queue';
import Reports from './components/Reports/Reports';
import ProtectedRoute, { ProtectedRouteProps } from './ProtectedRoute';
import { useTypedSelector } from './redux/useTypeSelector';

function App() {
  const loggedIn = useTypedSelector((state) => state.auth.loggedIn);

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: loggedIn,
    authenticationPath: "/login",
  };

  return (
    <div className="App" >
       <Router>
        <Switch>
        {/*  <Route exact path="/">
            {loggedIn ? (
              <Redirect
                to={{
                  pathname: "/queue",
                  state: { path: "/" },
                }}
              />
            ) : (
                <Redirect
                  to={{
                    pathname: "/",
                    state: { path: "/" },
                  }}
                />
              )}
          </Route> */}

          <Route exact path="/password-choose/:api_key">
            <PasswordChoose />
          </Route>

          {/* <Route exact path="/">
            {!loggedIn ? <Login /> : <Redirect to={"/"} />}
          </Route> */}
{/*
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact path="/kiosk"
            component={Kiosk}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact path="/reports"
            component={Reports}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact path="/patients"
            component={Patients}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact path="/queue"
            component={Queue}
          /> */}


          <Route exact path="/patient-registration">
            <PatientRegistration />
          </Route>
          <Route exact path="/kiosk">
            <Kiosk />
          </Route>
          <Route exact path="/reports">
            <Reports />
          </Route>
          <Route exact path="/patients">
            <Patients />
          </Route>
          <Route exact path="/queue">
            <Queue />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>

        </Switch>
      </Router>

    </div >
  );
}

export default App;
