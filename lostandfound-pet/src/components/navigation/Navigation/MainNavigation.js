import { useState } from "react";

import NavLinks from "./NavLinks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const [toggle, setToggle] = useState(false);

  const menuToggleHandler = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div className={classes.navigation}>
      <FontAwesomeIcon
        className={classes.logo}
        icon={icon({ name: "paw", style: "solid" })}
      />
      <NavLinks toggle={toggle} menuToggleHandler={menuToggleHandler} />

      <div className={classes.menu} onClick={menuToggleHandler}>
        <div className={`${classes.hamburger} ${toggle ? classes.active : ""}`}>
          <span className={classes.line} />
          <span className={classes.line} />
          <span className={classes.line} />
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
