import React, { Component } from "react";
import { hashHistory } from "react-router";
import AuthForm from "./AuthForm";
import loginMutation from "../mutations/Login";
import currentUserQuery from "../queries/CurrentUser";
import { graphql } from "react-apollo";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      // redirect to dashboard
      hashHistory.push("/dashboard");
    }
  }

  handleSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query: currentUserQuery }]
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(currentUserQuery)(graphql(loginMutation)(LoginForm));
