import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return <div>{this.props.message}</div>;
  }
}

export default connect(state => {
  return {
    message: state.auth.message
  };
}, actions)(Feature);
