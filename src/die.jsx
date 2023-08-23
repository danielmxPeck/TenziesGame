import React, { Component } from "react";

const Die = (props) => {
  return (
    <>
      <button
        onClick={props.toggleButtonState}
        style={{
          backgroundColor: props.state ? " rgba(56, 226, 56, 0.61)" : "",
        }}
      >
        <h2>{props.number}</h2>
      </button>
    </>
  );
};

export default Die;
