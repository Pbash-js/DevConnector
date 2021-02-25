import React from "react";

const ProfileAbout = ({ profile }) => {
  const skillArray = profile.skills.map((item) => (
    <div className="p-1" key={item}>
      <i className="fa fa-check"></i> {item}
    </div>
  ));

  return (
    <div className="profile-about bg-light p-2">
      <h2 className="text-primary">{`${profile.user.name}'s`} Bio</h2>
      <p>{profile.bio && profile.bio}</p>
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">{skillArray}</div>
    </div>
  );
};

export default ProfileAbout;
