import React, { useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
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

function App() {
  const loggedIn = useTypedSelector((state) => state.auth.loggedIn);

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: loggedIn,
    authenticationPath: "/login",
  };

  const [fullScreenMode, setFullScreenMode]= useState<boolean>(false);

  // const location = useLocation();
  // const splitLocation = location.pathname.split("/");
  // const api_key = splitLocation[splitLocation.length - 2];
  // const [client, setClient] = useState<Client>(ClientDefault);

  const fullScreenToggler = () => {
    setFullScreenMode(!fullScreenMode);
  };

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
            <>
            <NavBar />
            <MenuInfoPatient/>
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
            </>
          </Switch>
          </Fullscreen>
        </div>
  );
}

export default App;
