import React from "react";
import Moment from "react-moment";

const ProfileEducation = ({ profile }) => {
  const educationArray = profile.education.map((item) => (
    <div key={item}>
      <h3>{item.school}</h3>
      <p>
        <Moment format="DD/MM/YYYY">{item.from}</Moment> -
        {item.to ? <Moment format="DD/MM/YYYY">{item.to}</Moment> : " Now"}
      </p>
      <p>
        <strong>Degree: </strong>
        {item.degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {item.fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {item.description}
      </p>
    </div>
  ));
  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">Education</h2>
      {educationArray}
    </div>
  );
};

export default ProfileEducation;
