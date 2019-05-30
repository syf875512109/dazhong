import React, { Component } from "react";

import { Route, Redirect } from "react-router-dom";

import { isLogin } from "../../redux/modules/login";

import { connect } from "react-redux";

class PrivateRoute extends Component {
  render() {
    const { component: Component, login, ...rest } = this.props;
    return (
      <div>
        <Route
          {...rest}
          render={(props) => {
            return login ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            );
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    login: isLogin(state),
    // ...props,
  };
};
export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
