import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Icon.module.scss";

let cx = classNames.bind(styles);

const Icon = ({ name, small, large }) => {
  let className = cx({
    "Icon--small": small,
    "Icon--large": large,
  });

  return <FontAwesomeIcon className={className} icon={name || "smile"} />;
};

export default Icon;
