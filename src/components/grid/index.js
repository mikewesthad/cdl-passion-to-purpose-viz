import React from "react";
import style from "./index.module.scss";
import classJoin from "../../utils/class-join";

export function Grid({ Component = "div", className, children, ...props }) {
  return (
    <Component className={classJoin(className, style.grid)} {...props}>
      {children}
    </Component>
  );
}

export function Column({ Component = "div", className, children, ...props }) {
  return (
    <Component className={classJoin(className, style.col)} {...props}>
      {children}
    </Component>
  );
}

export function Column2({ className, children, ...props }) {
  return (
    <Column className={classJoin(className, style.col2)} {...props}>
      {children}
    </Column>
  );
}
