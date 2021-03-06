import React from 'react';
import PropTypes from 'prop-types';
import Brand from '../brand/Brand';

const Navbar = ({ signOut }) => (
  <nav className="navbar navbar-expand-lg navbar-light">
    <span className="navbar-brand"><Brand /></span>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div
      className="collapse navbar-collapse"
      id="navbarSupportedContent"
    >
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="/feed">
            Feed
            {' '}
            <span className="sr-only">(current)</span>
          </a>
        </li>
      </ul>
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
        >
        Search
        </button>
      </form>
      <span className="nav-item">
        <a
          className="nav-link disabled"
          href="#a"
          tabIndex="-1"
          aria-disabled="true"
        >
          Welcome
        </a>
      </span>
      <span
        className="nav-item"
        onClick={() => signOut()}
        onKeyPress={() => {}}
        role="button"
        aria-pressed="false"
        tabIndex="0"
      >
        <a className="nav-link text-dark" href="#a">Sign-Out</a>
      </span>
    </div>
  </nav>
);

const AuthNavbar = ({ ...props }) => (
  <div className="container px-0">
    <Navbar {...props} />
  </div>
);

export default AuthNavbar;

Navbar.propTypes = {
  signOut: PropTypes.func.isRequired
};
