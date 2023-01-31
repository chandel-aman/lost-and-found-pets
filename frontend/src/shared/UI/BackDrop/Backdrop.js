import React from 'react';
import ReactDOM from 'react-dom';

import classes from'./Backdrop.module.css';

const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className={classes.backdrop} onClick={props.onClick} style={props.style}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
