import React from "react";
import style from "./index.module.scss";
import classJoin from "../../utils/class-join";

export default function PageWrapper({ children, centerOnPage = false, ...props }) {
  return (
    <div className={classJoin(style.wrap, centerOnPage && style.center)} {...props}>
      {children}
    </div>
  );
}
