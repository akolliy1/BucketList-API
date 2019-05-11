/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Fragment, useState, useEffect } from 'react';
import PrimaryNavbar from 'Components/navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import authenticate from './authAction';
import { validateAField, validateAllFields } from '../../utils/validateRequestCredentials';

const Form = ({
  handleChange,
  handleClick,
  validationErrors,
  errorMessage
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
      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>{/* eslint-disable-line */}
    </div>
    {errorMessage && <div className="text-center py-2 text-danger">{errorMessage}</div>}
    <button
      type="submit"
      onClick={handleClick}
      className="btn btn-success btn-lg btn-block text-white"
    >
    Submit
    </button>
  </form>
);

const Authentication = ({
  authenticateUser,
  status: { authenticated },
  errorMessage,
  history: { push }
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
    console.log('error', inputData);
    validateOnClick(errors);
    if (passes) {
      return authenticateUser('/auth/login', inputData);
    }
  };

  useEffect(() => {
    if (authenticated) {
      push('/feed');
    }
  });

  return (
    <Fragment>
      <PrimaryNavbar />
      <div className="container">
        <div className="col-12 mx-auto my-5 col-md-5">
          <div className="card card-body">
            <Form
              validationErrors={validationErrors}
              handleChange={handleChange}
              handleClick={handleSubmit}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({
  authReducer: { status, user, errorMessage }
}) => ({
  status,
  user,
  errorMessage
});

export default connect(
  mapStateToProps,
  { authenticateUser: authenticate }
)(Authentication);

Authentication.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  status: PropTypes.shape({
    authenticated: PropTypes.bool
  }).isRequired,
  errorMessage: PropTypes.string.isRequired,
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
