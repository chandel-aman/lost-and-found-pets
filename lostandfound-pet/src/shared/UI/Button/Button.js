import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={[`${classes.button} ${classes[props.className]}`]}
    >
      {props.children}
    </button>
  );
};

export default Button;
