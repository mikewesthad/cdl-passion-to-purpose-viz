import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import style from "./index.module.scss";

export default class Nav extends Component {
  render() {
    return (
      <nav className={style.nav}>
        <NavLink className={style.navLink} to="/" exact activeClassName={style.navLinkActive}>
          Generator
        </NavLink>
        <NavLink className={style.navLink} to="/questions" activeClassName={style.navLinkActive}>
          Questions
        </NavLink>
        <NavLink className={style.navLink} to="/responses" activeClassName={style.navLinkActive}>
          Responses
        </NavLink>
        <NavLink className={style.navLink} to="/prompt-viz" activeClassName={style.navLinkActive}>
          Prompt Viz
        </NavLink>
      </nav>
    );
  }
}
