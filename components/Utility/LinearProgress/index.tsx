import React from "react";
import style from "./LinearProgress.module.scss";

interface ILinearProgress {
  visible: boolean;
}

const LinearProgress = ({ visible }: ILinearProgress) => {
  return (
    <div
      className={`${style.linearProgressMaterial} w-full ${
        visible ? "visible" : "invisible"
      }`}
    >
      <div className={`${style.bar} ${style.bar2}`}></div>
      <div className={`${style.bar} ${style.bar2}`}></div>
    </div>
  );
};

export default LinearProgress;
