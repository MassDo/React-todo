import React, { useEffect } from "react";

const Alert = ({ msg, type }) => {
  return <div className={`alert ${type}`}>{msg}</div>;
};

export default Alert;
