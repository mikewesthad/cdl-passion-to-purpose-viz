import React from "react";
import style from "./index.module.scss";
import classJoin from "../../utils/class-join";

export default function Container({ children, isSmall = false, ...props }) {
  return (
    <div
      className={classJoin(style.container, isSmall && style.small)}
      {...props}
    >
      {children}
    </div>
  );
}
