import React from "react";

export const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <fieldset>
    <label>{label}</label>
      <input className="form-control" {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <div className="error">{error}</div>) ||
          (warning && <div className="warning">{warning}</div>))}
  </fieldset>
);
