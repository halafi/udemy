import React, { Component } from "react";
import { Link } from "react-router";
import { graphql } from "react-apollo";
import currentUserQuery from "../queries/CurrentUser";
import logoutMutation from "../mutations/Logout";

class Header extends Component {
  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query: currentUserQuery }]
    });
  }

  renderButtons() {
    const { data: { user, loading } } = this.props;
    if (loading) {
      return <div />;
    }
    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
        </li>
      );
    }
    return (
      <div>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </div>
    );
  }

  render() {
    const { data: { user, loading } } = this.props;
    console.log(user);
    console.log(loading);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(logoutMutation)(graphql(currentUserQuery)(Header));
