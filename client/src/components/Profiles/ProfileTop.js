import React from "react";

const ProfileTop = ({ profile }) => {
  var socialArray = [];

  if (profile.social) {
    socialArray = Object.entries(profile.social).map((item) => (
      <a href={item[1]} target="_blank" rel="noopener noreferrer" key={item[1]}>
        <i className={`fab fa-${item[0]} fa-2x`}></i>
      </a>
    ));
  }

  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={profile.user.avatar} />
      <h1 className="large">{profile.user.name}</h1>
      <p className="lead">
        {profile.status} {profile.company && `at ${profile.company}`}
      </p>
      <p>{profile.location}</p>
      <div className="icons my-1">
        {profile.website && (
          <a href={profile.website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>
        )}

        {socialArray}
      </div>
    </div>
  );
};

export default ProfileTop;
