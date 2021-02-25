import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = (props) => {
  console.log(props.alerts);
  return (
    props.alerts.length !== 0 &&
    props.alerts.map((item) => (
      <div className="ogcolor">
        <div key={item.msg} className={`alert alert-${item.alertType}`}>
          {item.msg}
        </div>
      </div>
    ))
  );
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alertReducer,
  };
};

export default connect(mapStateToProps)(Alert);
