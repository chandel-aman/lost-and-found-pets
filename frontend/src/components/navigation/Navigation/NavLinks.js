import React from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

import classes from "./NavLinks.module.css";

const NavLinks = (props) => {
  const closeNav = () => {
    props.menuToggleHandler();
  };
  return (
    <nav className="navbar">
    <div className="navbar-container">
     <ul className={`${classes.navlinks} ${props.toggle ? classes.fadeInRight : ""}`}>
      <li>
        <NavLink
          to="/"
          onClick={closeNav}
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Found Pets
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/findPet"
          onClick={closeNav}
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Lost Pets
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contactUs"
          onClick={closeNav}
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
        Report
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/"
        onClick={closeNav}
        className={({ isActive }) => (isActive ? classes.active : undefined)}
      >
          Contact
        </NavLink>
      </li>
      <li className={classes.login}>
        <NavLink
          to="/"
          onClick={closeNav}
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Log in
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
    </div>
        </nav>

  );
};

export default NavLinks;
