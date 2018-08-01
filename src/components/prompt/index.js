import React from "react";
import style from "./index.module.scss";
import classJoin from "../../utils/class-join";

export default function Prompt({
  passion,
  purpose,
  isSmall = false,
  ...props
}) {
  return (
    <div className={classJoin(style.prompt, isSmall || style.big)} {...props}>
      How might we use{" "}
      <span className={style.passion}>{passion.toLowerCase().trim()}</span> to{" "}
      <span className={style.purpose}>{purpose.toLowerCase().trim()}</span>?
    </div>
  );
}
