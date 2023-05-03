import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.less";

const NotFound = () => {
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/");
  };
  return (
    <div className={styles["not-found"]}>
      404
      <Button type="primary" onClick={toHome}>
        返回首页
      </Button>
    </div>
  );
};

export default NotFound;
