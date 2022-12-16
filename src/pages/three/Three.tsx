import React from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import styles from "./Three.less";

const Three = () => {
  const navigate = useNavigate();
  const toConfig = debounce(() => {
    navigate("/threeConfig");
  }, 300);
  return (
    <div className={styles["three-wrapper"]}>
      <div className={styles["three-item"]} onClick={toConfig}>
        +
      </div>
    </div>
  );
};

export default Three;
