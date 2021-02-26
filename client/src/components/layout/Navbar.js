import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [darkMode, toggleDarkMode] = useState(false);
  const darkModeToggle = () => {
    document.querySelector(".darkmodebutton").opacity = 0;
    setTimeout(() => {
      document
        .querySelectorAll(".ogcolor")
        .forEach((el) => el.classList.toggle("notinvert"));
    }, 500);
    document.querySelector(".navbar").style.opacity = 1;
    if (!darkMode) {
      document
        .querySelector(".darkmodecircle")
        .classList.add("darkmodecircleactive");

      setTimeout(() => {
        document.documentElement.classList.add("invert");
        toggleDarkMode(true);
      }, 500);
      setTimeout(() => {
        document
          .querySelector(".darkmodecircle")
          .classList.remove("darkmodecircleactive");
      }, 1000);
    } else {
      document
        .querySelector(".darkmodecircle")
        .classList.add("darkmodecircleactive");
      setTimeout(() => {
        document.documentElement.classList.remove("invert");
        toggleDarkMode(false);
      }, 500);
      setTimeout(() => {
        document
          .querySelector(".darkmodecircle")
          .classList.remove("darkmodecircleactive");
      }, 1000);
    }
  };

  const authLinks = (
    <>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <a href="#" onClick={() => logout()}>
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">{` `}Logout</span>
        </a>
      </li>
    </>
  );

  const guest = (
    <>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  const darkModeSwitch = (
    <>
      <div className="darkmodecircle ogcolor"></div>
      <div
        className="darkmodebutton"
        onClick={() => {
          darkModeToggle();
        }}
      >
        {darkMode ? (
          <i className="fa fa-sun-o"></i>
        ) : (
          <i className="fa fa-moon-o"></i>
        )}
      </div>
    </>
  );

  return (
    <nav id="navbar" className="navbar bg-dark ogcolor">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i>
          {` `}DevConnector
        </Link>
      </h1>
      <ul>
        {darkModeSwitch}
        {!loading && <>{isAuthenticated ? authLinks : guest}</>}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.authReducer };
};

export default connect(mapStateToProps, { logout })(Navbar);
