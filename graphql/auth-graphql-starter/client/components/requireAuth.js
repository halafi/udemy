import React, { Component } from "react";
import { hashHistory } from "react-router";
import { graphql } from "react-apollo";
import currentUserQuery from "../queries/CurrentUser";

export default WrapperComponent => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps, nextState) {
      if (!nextProps.data.loading && !nextProps.data.user) {
        hashHistory.push("/login");
      }
    }

    render() {
      return <WrapperComponent {...this.props} />;
    }
  }

  return graphql(currentUserQuery)(RequireAuth);
};
