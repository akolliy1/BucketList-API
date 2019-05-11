import React from 'react';
import Brand from '../brand/Brand';

const Navbar = () => (
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
          <a className="nav-link" href="/">
            Explore
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
    </div>
  </nav>
);

const PrimaryNavbar = () => (
  <div className="container px-0">
    <Navbar />
  </div>
);

export default PrimaryNavbar;
