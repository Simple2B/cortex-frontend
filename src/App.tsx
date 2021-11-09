import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.sass';
import Account from './components/ClientInfo/Account/Account';
import Intake from './components/ClientInfo/Intake/Intake';
import Name from './components/ClientInfo/Name/Name';
import Kiosk from './components/Kiosk/Kiosk';
import Login from './components/Login/Login';
import PasswordChoose from './components/PasswordChoose/PasswordChoose';
import PatientRegistration from './components/PatientRegistration/PatientRegistration';
import Queue from './components/Queue/Queue';
import Reports from './components/Reports/Reports';
import ProtectedRoute, { ProtectedRouteProps } from './ProtectedRoute';
import { useTypedSelector } from './redux/useTypeSelector';
import Fullscreen from 'react-fullscreen-crossbrowser';
import Patient from './components/Patients/Patients';
import NavBar from './components/NavBar/NavBar';
import MenuInfoPatient from './components/ClientInfo/MenuInfoPatient/MenuInfoPatient';
import NameOn from './components/ClientInfo/Name/NameOn';
import { directive } from '@babel/types';
import InfoDevice from './components/ClientInfo/InfoDevice/InfoDevice';

function App() {
  const loggedIn = useTypedSelector((state) => state.auth.loggedIn);

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: loggedIn,
    authenticationPath: "/login",
  };

  const [fullScreenMode, setFullScreenMode]= useState<boolean>(false);

  const fullScreenToggler = () => {
    setFullScreenMode(!fullScreenMode);
  };

  useEffect(() => {
    setFullScreenMode(fullScreenMode);
  }, [fullScreenMode]);

  return (
        <div className="App" >
          <Fullscreen enabled={fullScreenMode}>
          <i className={ fullScreenMode ? "fas fa-compress-arrows-alt fullScreenBtn": "fas fa-expand-arrows-alt fullScreenBtn"} onClick={fullScreenToggler}/>
          <Switch>
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
                exact path="/patients"
                component={Patient}
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
                exact path="/nameOn/:dashboard"
                render={ () => {
                    return (
                    <>
                      <div className="containerNameOn">
                        <InfoDevice/>
                        <NavBar />
                      </div>
                      <NameOn/>
                    </>
                    )
                  }
                }
              />
            <>
            <div className="containerNavBarMenuInfoPatient">
              <InfoDevice/>
              <NavBar />
              <MenuInfoPatient/>
            </div>
            <div className="containerForClientInfo">
              <Switch>
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
                    <ProtectedRoute
                        {...defaultProtectedRouteProps}
                        exact path="/:api_key/:first_name"
                        component={Name}
                    />
              </Switch>
            </div>
            </>
          </Switch>
          </Fullscreen>
        </div>
  );
}

export default App;
