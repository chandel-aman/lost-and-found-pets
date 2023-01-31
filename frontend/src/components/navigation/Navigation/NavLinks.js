import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavLinks.module.css";

const NavLinks = (props) => {
  const closeNav = () => {
    props.menuToggleHandler();
  };
  return (
    <ul className={`${classes.navlinks} ${props.toggle ? classes.fadeInRight : ""}`}>
      <li>
        <NavLink
          to="/"
          onClick={closeNav}
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/findPet"
          onClick={closeNav}
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Lost&Found
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contactUs"
          onClick={closeNav}
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          onClick={closeNav}
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Login
        </NavLink>
      </li>
      <li className={classes.signup}>
        <NavLink
          to="/"
          onClick={closeNav}
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Sign up
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
