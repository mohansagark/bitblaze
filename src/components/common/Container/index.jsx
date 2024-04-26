import React from "react";

const Container = ({ children = <></>, center = false }) => {
  return (
    <div
      className={`${
        center ? "flex items-center justify-center" : ""
      } w-full min-h-full bg-background`}
    >
      {children}
    </div>
  );
};

export default Container;
