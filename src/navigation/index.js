import React, { useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import helper from "../components/helper";

// guest
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";

// user
const Dashboard = React.lazy(() => import("../pages/user/Dashboard"));

function Navigation(props) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Switch>
      {/* guest routes */}
      <Route exact path="/" component={Home} />
      {/* end of guest routes */}

      {/* user routes */}
      <PublicRoute auth={props?.auth} exact path="/login" component={Login} />
      <PublicRoute
        auth={props?.auth}
        exact
        path="/register"
        component={Register}
      />
      <PrivateRoute
        auth={props?.auth}
        exact
        path="/dashboard"
        component={Dashboard}
      />
      {/* end of user routes */}

      <Route component={NotFound} />
    </Switch>
  );
}

const mapStateToProps = function (state) {
  return {
    auth: state?.auth,
  };
};

export default connect(mapStateToProps)(Navigation);

function PrivateRoute({ auth, path, exact, component }) {
  const { isAuthenticated, user } = auth;

  return (
    <>
      {isAuthenticated ? (
        <Route path={path} exact={exact} component={component} />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

function PublicRoute({ auth, path, exact, component }) {
  const { isAuthenticated, user } = auth;

  return (
    <>
      {isAuthenticated && !helper.hasPlan(user) ? (
        <Redirect to="/subscribe" />
      ) : !isAuthenticated ? (
        <Route path={path} exact={exact} component={component} />
      ) : (
        <Redirect to="/home" />
      )}
    </>
  );
}
