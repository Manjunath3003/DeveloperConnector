//To display the alerts from redux
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    //alert unique key and style for the msg
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));
// alerts is array proptype
Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};
//state from the reducer converted to props
const mapStateToProps = (state) => ({
  alerts: state.alert // state from alert reducer
});
export default connect(mapStateToProps)(Alert);
