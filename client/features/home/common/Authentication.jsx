/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { validateAField, validateAllFields } from 'Utilities/validateRequestCredentials';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import authenticate from '../../authentication/authAction';

const Form = ({
  handleChange,
  handleClick,
  validationErrors,
  errorMessage,
}) => (
  <form>
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">Email address</label>
      <input
        type="email"
        name="email"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter email"
        onChange={handleChange}
      />
      {!validationErrors.email && (
      <small id="emailHelp" className="form-text">
        {'We\'ll'}
        {' '}
        never share your email with anyone else.
      </small>
      )}
      <div className="text-danger help-block">{validationErrors.email}</div>
    </div>

    <div className="form-group">
      <label htmlFor="exampleInputPassword1">Password</label>
      <input
        type="password"
        name="password"
        className="form-control"
        id="exampleInputPassword1"
        placeholder="Password"
        onChange={handleChange}
      />
      <div className="text-danger help-block">{validationErrors.password}</div>
    </div>
    <div className="form-group form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
      <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>{/* eslint-disable-line */}
    </div>
    {errorMessage && <div className="text-center py-2 text-danger">{errorMessage}</div>}
    <button
      type="submit"
      onClick={handleClick}
      className="btn btn-light btn-lg btn-block text-success"
    >
    Submit
    </button>
  </form>
);

const Authentication = ({
  authenticateUser,
  errorMessage
}) => {
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });
  const [inputData, setData] = useState({
    email: '',
    password: ''
  });

  const handleChange = ({ target: { name, value } }) => {
    const newFieldData = { [name]: value };
    const validation = validateAField(newFieldData, name);
    setData({
      ...inputData,
      [name]: value
    });
    setValidationErrors({
      ...validationErrors,
      [name]: validation.message
    });
  };

  const validateOnClick = (newValidationErrors) => {
    setValidationErrors({
      ...validationErrors,
      ...newValidationErrors,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateAllFields(inputData);

    const { errors, passes } = validation;
    validateOnClick(errors);
    if (passes) {
      return authenticateUser('/auth/login', inputData);
    }
  };

  return (
    <Form
      handleChange={handleChange}
      handleClick={handleSubmit}
      validationErrors={validationErrors}
      errorMessage={errorMessage}
    />
  );
};

const mapStateToProps = ({
  authReducer: { errorMessage }
}) => ({
  errorMessage
});

export default connect(
  mapStateToProps,
  { authenticateUser: authenticate }
)(Authentication);


Authentication.defaultProps = {
  errorMessage: ''
};

Authentication.propTypes = {
  errorMessage: PropTypes.string,
  authenticateUser: PropTypes.func.isRequired,
};

Form.defaultProps = {
  errorMessage: ''
};

Form.propTypes = {
  handleClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  validationErrors: PropTypes.objectOf(PropTypes.string).isRequired,
};
