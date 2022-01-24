import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.sass";
import Account from "./components/ClientInfo/Account/Account";
import Name from "./components/ClientInfo/Name/Name";
import Kiosk from "./components/Kiosk/Kiosk";
import Login from "./components/Login/Login";
import PasswordChoose from "./components/PasswordChoose/PasswordChoose";
import PatientRegistration from "./components/PatientRegistration/PatientRegistration";
import Queue from "./components/Queue/Queue";
import Reports from "./components/Reports/Reports";
import ProtectedRoute, { ProtectedRouteProps } from "./ProtectedRoute";
import { useTypedSelector } from "./redux/useTypeSelector";
// import Fullscreen from "react-fullscreen-crossbrowser";
import Patient from "./components/Patients/Patients";
import NavBar from "./components/NavBar/NavBar";
import MenuInfoPatient from "./components/ClientInfo/MenuInfoPatient/MenuInfoPatient";
import NameOn from "./components/ClientInfo/Name/NameOn";
import InfoDevice from "./components/ClientInfo/InfoDevice/InfoDevice";
import Intake from "./components/ClientInfo/Intake_CarePlane_Notes/Intake";
import { CarePlane } from "./components/ClientInfo/Intake_CarePlane_Notes/CarePlane";
import { Notes } from "./components/ClientInfo/Intake_CarePlane_Notes/Notes";
import { AccountReport } from "./components/ClientInfo/AccountReport/AccountReport";
import AccountReportStart from "./components/ClientInfo/AccountReport/AccountReportStart";
import ViewReport from "./components/ClientInfo/AccountReport/ViewReport/ViewReport";

function App() {
  const loggedIn = useTypedSelector((state) => state.auth.loggedIn);

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: loggedIn,
    authenticationPath: "/login",
  };

  const isFullscreenAvailable = document.fullscreenEnabled;

  const [fullScreenMode, setFullScreenMode] = useState<boolean>(false);

  console.log("App: fullScreenMode => ", fullScreenMode);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullScreenMode(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreenMode(false);
      }
    }
  };

  const requestFullScreen = () => {
    if (isFullscreenAvailable) {
      toggleFullScreen();
    } else {
      console.log("Your browser cannot use fullscreen right now");
    }
  };

  return (
    <div className="App">
      <div className="containerFullScreenBtn">
        <i
          className={
            fullScreenMode
              ? "fas fa-compress-arrows-alt fullScreenBtn"
              : "fas fa-expand-arrows-alt fullScreenBtn"
          }
          onClick={() => {
            requestFullScreen();
          }}
        />
      </div>

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
          exact
          path="/kiosk"
          component={Kiosk}
        />
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          exact
          path="/patients"
          component={Patient}
        />
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          exact
          path="/reports"
          component={Reports}
        />
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          exact
          path="/queue"
          component={Queue}
        />
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          exact
          path="/nameOn/:dashboard"
          render={() => {
            return (
              <>
                <div className="containerNameOn">
                  <InfoDevice />
                  <NavBar />
                </div>
                <NameOn />
              </>
            );
          }}
        />
        <>
          <div className="containerNavBarMenuInfoPatient">
            <InfoDevice />
            <NavBar />
            <MenuInfoPatient />
          </div>
          <div className="containerForClientInfo">
            <Switch>
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                exact
                path="/:api_key/intake"
                component={Intake}
              />

              <ProtectedRoute
                {...defaultProtectedRouteProps}
                exact
                path="/:api_key/account"
                component={Account}
              />

              <ProtectedRoute
                {...defaultProtectedRouteProps}
                exact
                path="/:api_key/care_plane"
                component={CarePlane}
              />

              <ProtectedRoute
                {...defaultProtectedRouteProps}
                exact
                path="/:api_key/notes"
                component={Notes}
              />

              <ProtectedRoute
                {...defaultProtectedRouteProps}
                exact
                path="/:api_key/report"
                component={AccountReport}
              />

              <ProtectedRoute
                {...defaultProtectedRouteProps}
                exact
                path="/:api_key/start"
                component={AccountReportStart}
              />
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                exact
                path={"/:api_key/view_report_" + ":report_id"}
                component={ViewReport}
              />

              <ProtectedRoute
                {...defaultProtectedRouteProps}
                exact
                path="/:api_key/:first_name"
                component={Name}
              />
            </Switch>
          </div>
        </>
      </Switch>
    </div>
  );
}

export default App;
