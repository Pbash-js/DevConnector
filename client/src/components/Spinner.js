import React from "react";
import gif from "../img/tenor.gif";

const Spinner = () => {
  return (
    <div>
      <img
        src={gif}
        style={{ width: "500px", display: "block", margin: "auto auto" }}
        alt="Loading"
      />
    </div>
  );
};

export default Spinner;
