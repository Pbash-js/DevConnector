import React from "react";
import Moment from "react-moment";

const ProfileExperience = ({ profile }) => {
  const expArray = profile.experience.map((item) => (
    <div key={item}>
      <h3 class="text-dark">{item.company}</h3>
      <p>
        <Moment format="MMM YYYY">{item.from}</Moment> -{" "}
        {item.to ? <Moment format="MMM YYYY">{item.to}</Moment> : "Now"}
      </p>
      <p>
        <strong>Position: </strong>
        {item.title}
      </p>
      {item.description && (
        <p>
          <strong>Description: </strong>
          {item.description}
        </p>
      )}
    </div>
  ));
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>
      {expArray}
    </div>
  );
};

export default ProfileExperience;
