import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import React from "react";

const PrivateRoute = ({
  component: Component,
  auth: { loading, isAuthenticated },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state) => {
  return { auth: state.authReducer };
};

export default connect(mapStateToProps)(PrivateRoute);
