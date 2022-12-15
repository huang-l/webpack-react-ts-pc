import React, { useEffect } from "react";
import AMap from "AMap";
import styles from "./Home.less";

const Home = () => {
  useEffect(() => {
    const map = new AMap.Map("map", {
      resizeEnable: true,
      center: [105, 34],
      zoom: 3,
    });
  });
  return (
    <div className={styles["home-wrapper"]}>
      <div id="map"></div>
    </div>
  );
};

export default Home;
