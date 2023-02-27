import React from "react";

const ColoredProfilePic = ({ src }) => {
  return (
    <>
      <div
        style={{
          background: "radial-gradient(green, transparent)",
          position: "absolute",
          zIndex: "1",
          width: "5rem",
          height: "5rem",
          borderRadius: "50%"
        }}
      ></div>
      <img src={src} alt="alt" style={{ width: "60px", zIndex: "2" }} className="rounded-circle"/>
    </>
  );
};

export default ColoredProfilePic;
