import React from "react";

import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <div className={classes.wraper}>
      <svg className={classes.svg}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00bc9b" />
            <stop offset="100%" stopColor="#5eaefd" />
          </linearGradient>
        </defs>
        <circle
          cx="70"
          cy="70"
          r="70"
          stroke="url(#gradient)"
          className={classes.circle}
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
