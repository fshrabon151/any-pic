import React from "react";
import Loader from "react-loader-spinner";

const Spinner = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader type="Circles" color="#666" height={100} width={100} />
    </div>
  );
};

export default Spinner;
