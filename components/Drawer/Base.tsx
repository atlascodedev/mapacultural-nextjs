import React from "react";

export interface IDrawerBase {}

const Base: React.FC<IDrawerBase> = ({ children }) => {
  return (
    <div className="h-screen  fixed left-0 top-0 bg-white shadow-lg">
      {children}
    </div>
  );
};

export default Base;
