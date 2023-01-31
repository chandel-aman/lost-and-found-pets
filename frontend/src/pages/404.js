import gif from "../assets/nodding.gif";

import classes from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={classes.NotFoundPage}>
      <img src={gif} alt="nodding bear" />
      <h1>Page not found!</h1>
    </div>
  );
};

export default NotFoundPage;
