import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProfileItem, getGithubRepos } from "../../actions/profile";
import ProfileAbout from "./ProfileAbout";
import ProfileTop from "./ProfileTop";
import Spinner from "../Spinner";
import ProfileEducation from "./ProfileEducation";
import ProfileExperience from "./ProfileExperience";
import ProfileGithub from "./ProfileGithub";
import { Link } from "react-router-dom";
const ProfileItem = ({
  match,
  getProfileItem,
  getGithubRepos,
  profile,
  repos,
  isAuthenticated,
  user,
}) => {
  useEffect(() => {
    getProfileItem(match.params.id);
  }, []);

  useEffect(() => {
    if (profile !== null) getGithubRepos(profile.githubusername);
  }, [profile]);

  if (profile === null) {
    return <Spinner />;
  } else
    return (
      <>
        <div className="profile-grid my-1">
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileExperience profile={profile} />
          <ProfileEducation profile={profile} />
          <ProfileGithub repos={repos} />
        </div>
        <Link className="btn btn-dark my-1" to="/profiles">
          Go back
        </Link>
        {isAuthenticated && user._id === profile.user._id && (
          <Link className="btn btn-danger my-1" to="/edit-profile">
            Edit Profile
          </Link>
        )}
      </>
    );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profileReducer.profile,
    repos: state.profileReducer.repos,
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user,
  };
};

export default connect(mapStateToProps, { getProfileItem, getGithubRepos })(
  ProfileItem
);
