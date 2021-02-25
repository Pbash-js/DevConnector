import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfiles } from "../../actions/profile";
import Spinner from "../Spinner";

const Profiles = ({ profiles, getProfiles, loading }) => {
  useEffect(() => {
    getProfiles();
  }, []);

  const profileArray = profiles.map((item) => (
    <div className="profile bg-light" key={item.user._id}>
      <img className="round-img" src={item.user.avatar} alt="" />
      <div>
        <h2>{item.user.name}</h2>
        <p>
          {item.status} {item.company && `at ${item.company}`}
        </p>
        <p>{item.location && `${item.location}`}</p>
        <Link to={`/profile/${item.user._id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>

      <ul>
        {item.skills.map((skill) => (
          <li className="text-primary" key={skill}>
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  ));

  return loading || profiles === [] ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      <div className="profiles">{profileArray}</div>
      <Link className="btn btn-light my-1" to="/dashboard">
        Go Back
      </Link>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profiles: state.profileReducer.profiles,
    loading: state.profileReducer.loading,
  };
};

export default connect(mapStateToProps, { getProfiles })(Profiles);
