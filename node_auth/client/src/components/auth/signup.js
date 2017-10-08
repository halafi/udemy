import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions";
import { renderField } from "../../helpers/reduxForm";

class Signup extends Component {
  handleFormSubmit(formProps) {
    console.log(formProps);
    this.props.signupUser(formProps);
  }
  render() {
    const { handleSubmit, valid, errorMessage } = this.props;
    console.log(this.props);
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="email"
          type="email"
          label="Email"
          component={renderField}
        />
        <Field
          name="password"
          type="password"
          label="Password"
          component={renderField}
        />
        <Field
          name="passwordConfirm"
          type="password"
          label="Confirm Password"
          component={renderField}
        />
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <button disabled={!valid} action="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    );
  }
}

function validate(formProps) {
  let errors = {};
  console.log(formProps);
  if (!formProps.email) {
    errors.email = "required";
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = "required";
  }
  if (!formProps.password) {
    errors.password = "required";
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = "Passwords must match";
    errors.passwordConfirm = "Passwords must match";
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

Signup = connect(mapStateToProps, actions)(Signup);

export default reduxForm({
  form: "signup",
  validate
})(Signup);
