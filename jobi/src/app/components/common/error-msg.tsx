import React from "react";


const ErrorMsg = ({ msg }: { msg: string }) => {
  return <div style={{ color: "red" }}>{msg}</div>;
};

export default ErrorMsg;
