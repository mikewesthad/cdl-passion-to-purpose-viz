import React from "react";
import style from "./index.module.scss";
import classJoin from "../../utils/class-join";

export default function Button({ Component = "button", className, children, ...props }) {
  return (
    <Component className={classJoin(className, style.button)} {...props}>
      {children}
    </Component>
  );
}
