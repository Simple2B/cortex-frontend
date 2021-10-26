import { useEffect } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
} & RouteProps;

export default function ProtectedRoute({
  isAuthenticated,
  authenticationPath,
  ...routeProps
}: ProtectedRouteProps) {
  const location = useLocation();
  // console.log(`protected location`, location);

  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: authenticationPath,
          state: { path: location.pathname },
        }}
      />
    );
  }
}
