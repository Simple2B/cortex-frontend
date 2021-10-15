import React from 'react';
import {
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import Account from './components/ClientInfo/Account/Account';
import Intake from './components/ClientInfo/Intake/Intake';
import Kiosk from './components/Kiosk/Kiosk';
import Login from './components/Login/Login';
import PasswordChoose from './components/PasswordChoose/PasswordChoose';
import PatientRegistration from './components/PatientRegistration/PatientRegistration';
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

  console.log("loggedIn", loggedIn)

  return (
    <div className="App" >
         <Route exact path="/">
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
                    pathname: "/login",
                    state: { path: "/" },
                  }}
                />
              )}
          </Route>
          <Route path="/password-choose/:api_key" children={<PasswordChoose />} />
          {/* <Route path="/password-choose/:api_key">
            <PasswordChoose />
          </Route> */}
          <Route exact path="/patient-registration">
            <PatientRegistration />
          </Route>

          <Route exact path="/login">
            {!loggedIn ? <Login /> : <Redirect to={"/"} />}
          </Route>

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
            exact path="/queue"
            component={Queue}
          />

          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact path="/:api_key/intake"
            component={Intake}
          />

          <ProtectedRoute
              {...defaultProtectedRouteProps}
              exact path="/:api_key/account"
              component={Account}
          />


          {/*
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
          </Route> */}
    </div >
  );
}

export default App;
