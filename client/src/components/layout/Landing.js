import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const Landing = ({ isAuthenticated }) => {
  const [title, setTitle] = useState("");
  const fulltitle = "DevConnector";

  useEffect(() => {
    document.querySelector("body").style.overflow = "hidden";
    setTimeout(() => {
      [...fulltitle].forEach((item, index) =>
        setTimeout(() => {
          if (title === fulltitle) return 0;
          setTitle((title) => title + item);
        }, 100 * index)
      );
    }, 200);

    return () => {
      document.querySelector("body").style.overflow = "auto";
    };
  }, []);

  return isAuthenticated ? (
    <Redirect to="/dashboard" />
  ) : (
    <section
      className={`landing ogcolor ${
        document.documentElement.classList.value === "invert" && "notinvert"
      }`}
    >
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">
            {title}
            <span className="animated-cursor">|</span>
          </h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Landing);
