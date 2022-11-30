import IonIcon from "@reacticons/ionicons";

import classes from "./Toast.module.css";

const Toast = (props) => {
  return (
    <div className={classes.toastContainer}>
      <div className={`${classes.toast} ${props.toggle ? classes.show : ""}`}>
        <IonIcon name="checkmark-circle-outline"></IonIcon>
        <h3>{props.children}</h3>
      </div>
    </div>
  );
};

export default Toast;
