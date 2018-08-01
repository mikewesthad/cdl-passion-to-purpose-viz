import React from "react";
import style from "./index.module.scss";
import classJoin from "../../utils/class-join";

export default function Toast({ className, shouldShow, children, ...props }) {
  return (
    <div className={classJoin(style.toast, shouldShow && style.show, className)} {...props}>
      {children}
    </div>
  );
}
