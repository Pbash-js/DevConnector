import React, { useEffect } from "react";
import { getProfile, deleteProfile } from "../../actions/profile";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { Link, withRouter } from "react-router-dom";
import DashboardLinks from "./DashboardLinks";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({ loading, profile, getProfile, deleteProfile, user }) => {
  useEffect(() => {
    getProfile();
  }, []);

  return loading === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">Hey there {user && user.name}!</p>
      {profile !== null ? (
        <div>
          <DashboardLinks />
          <br />
          <hr />
          <br />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <button
            className="btn btn-danger"
            onClick={() => {
              deleteProfile();
            }}
          >
            Delete Profile
          </button>
        </div>
      ) : (
        <div>
          Let's set up your profile?
          <br />
          <br />
          <Link to="/createprofile">
            <button className="btn btn-primary">Create Profile</button>
          </Link>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    loading: state.authReducer.loading,
    profile: state.profileReducer.profile,
    user: state.authReducer.user,
  };
};

export default connect(mapStateToProps, { getProfile, deleteProfile })(
  Dashboard
);
