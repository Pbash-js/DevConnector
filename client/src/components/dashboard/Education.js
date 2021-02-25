import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  if (education.length > 0) {
    return (
      <>
        <h2 className="my-2">Education</h2>
        <table className="table">
          <thead>
            <tr>
              <th>School/Bootcamp</th>
              <th className="hide-sm">Degree</th>
              <th className="hide-sm">Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {education.map((item) => (
              <tr>
                <td>{item.school}</td>
                <td className="hide-sm">{item.degree}</td>
                <td className="hide-sm">
                  <Moment format="DD-MM-YY">{item.from}</Moment> {`-`}
                  {item.to === null ? "Now" : item.to}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteEducation(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  } else return <p className="lead">Add some Education?</p>;
};

export default connect(null, { deleteEducation })(Education);
