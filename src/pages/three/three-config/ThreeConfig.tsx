import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { debounce, cloneDeep } from "lodash";
import { Collapse, Checkbox } from "antd";
import {
  geometryConfigs,
  materialConfigs,
  cameraConfigs,
} from "@/pages/three/businessTypes";
import { hexToNum } from "@/util/commonService";
import Model from "./config/model/Model";
import Camera from "./config/camera/Camera";
import styles from "./ThreeConfig.less";

const ThreeConfig = () => {
  const canvas = useRef<any>(null);
  const scene = useRef<any>(null); //场景
  const renderer = useRef<any>(null); //渲染器
  const camera = useRef<any>(null); //相机
  const configRef = useRef<{ [x: string]: any }>({
    isShowAxes: false,
    model: "mesh",
    geometry: "BoxGeometry",
    material: "MeshBasicMaterial",
    camera: "OrthographicCamera",
    gConfig: geometryConfigs.BoxGeometry,
    mConfig: materialConfigs.MeshBasicMaterial,
    cConfig: cameraConfigs.OrthographicCamera,
  });

  const [config, setConfig] = useState<{ [x: string]: any }>({
    isShowAxes: false,
    model: "mesh",
    geometry: "BoxGeometry",
    material: "MeshBasicMaterial",
    camera: "OrthographicCamera",
    gConfig: geometryConfigs.BoxGeometry,
    mConfig: materialConfigs.MeshBasicMaterial,
    cConfig: cameraConfigs.OrthographicCamera,
  });

  const changeConfig = useCallback((val: any, type: string) => {
    const currentConfig = cloneDeep(configRef.current);
    currentConfig[type] = val;
    if (type === "model") {
      let material = "PointsMaterial";
      val === "line" && (material = "LineBasicMaterial");
      val === "mesh" && (material = "MeshBasicMaterial");
      currentConfig.material = material;
      currentConfig.mConfig = materialConfigs[material];
    }
    if (type === "geometry") {
      currentConfig.gConfig = geometryConfigs[val];
    }
    if (type === "material") {
      currentConfig.mConfig = materialConfigs[val];
    }
    if (type === "camera") {
      currentConfig.cConfig = cameraConfigs[val];
    }
    configRef.current = currentConfig;
    setConfig(currentConfig);
  }, []);

  const render = () => {
    if (!renderer.current || !scene.current || !camera.current) return;
    renderer.current.render(scene.current, camera.current);
    // 渲染下一帧时在调用render函数
    requestAnimationFrame(render);
  };
  useEffect(() => {
    if (scene.current) {
      if (config.isShowAxes) {
        const axesHelper = new THREE.AxesHelper(250);
        scene.current.add(axesHelper);
      } else {
        scene.current.children.forEach((child: any) => {
          if (child.type === "AxesHelper") {
            scene.current.remove(child);
          }
        });
      }
    }
  }, [config.isShowAxes]);
  // 清空场景内容
  const clearScene = () => {
    scene.current.traverse((child: any) => {
      child.material?.dispose();
      child.geometry?.dispose();
      child = null;
    });
    scene.current.clear();
    scene.current = null;
  };

  // 添加模型
  const addModel = () => {
    if (!scene.current || !camera.current || !renderer.current) return;
    scene.current.children.forEach((child: any) => {
      if (child.material && child.geometry && child.type !== "AxesHelper") {
        scene.current.remove(child);
      }
    });
    let geometry = null;
    let {
      width,
      height,
      depth,
      widthSegments,
      heightSegments,
      depthSegments,
      radiusTop,
      radiusBottom,
      radialSegments,
      radius,
      detail,
      innerRadius,
      outerRadius,
      thetaSegments,
      phiSegments,
      segments,
    } = config.gConfig;
    switch (config.geometry) {
      case "BoxGeometry":
        geometry = new THREE.BoxGeometry(
          width,
          height,
          depth,
          widthSegments,
          heightSegments,
          depthSegments
        );
        break;
      case "CylinderGeometry":
        geometry = new THREE.CylinderGeometry(
          radiusTop,
          radiusBottom,
          height,
          radialSegments,
          heightSegments
        );
        break;
      case "SphereGeometry":
        geometry = new THREE.SphereGeometry(
          radius,
          widthSegments,
          heightSegments
        );
        break;
      case "ConeGeometry":
        geometry = new THREE.ConeGeometry(
          radius,
          height,
          radialSegments,
          heightSegments
        );
        break;
      case "TetrahedronGeometry":
        geometry = new THREE.TetrahedronGeometry(radius, detail);
        break;
      case "OctahedronGeometry":
        geometry = new THREE.OctahedronGeometry(radius, detail);
        break;
      case "DodecahedronGeometry":
        geometry = new THREE.DodecahedronGeometry(radius, detail);
        break;
      case "IcosahedronGeometry":
        geometry = new THREE.IcosahedronGeometry(radius, detail);
        break;
      case "RingGeometry":
        geometry = new THREE.RingGeometry(
          innerRadius,
          outerRadius,
          thetaSegments,
          phiSegments
        );
        break;
      case "PlaneGeometry":
        geometry = new THREE.PlaneGeometry(
          width,
          height,
          widthSegments,
          heightSegments
        );
        break;
      case "CircleGeometry":
        geometry = new THREE.CircleGeometry(radius, segments);
        break;
      default:
        break;
    }
    if (!geometry) return;
    let material = null;
    let model = null;
    let { color } = config.mConfig;
    switch (config.model) {
      case "point":
        material = new THREE.PointsMaterial({
          color: hexToNum(color),
          size: 5.0, //点对象像素尺寸
        });
        model = new THREE.Points(geometry, material);
        break;
      case "line":
        material = new THREE[config.material]({
          color: hexToNum(color), //线条颜色
        });
        model = new THREE.Line(geometry, material);
        break;
      case "mesh":
        material = new THREE[config.material]({
          color: hexToNum(color), //三角面颜色
        });
        model = new THREE.Mesh(geometry, material);
        break;
      default:
        break;
    }
    model && scene.current.add(model);
    renderer.current.render(scene.current, camera.current);
  };

  // 在模型配置修改后重新添加模型
  useEffect(() => {
    addModel();
  }, [
    config.model,
    config.geometry,
    config.material,
    config.gConfig,
    config.mConfig,
  ]);

  // 添加相机
  const addCamera = () => {
    if (!canvas.current) return;
    const { offsetWidth, offsetHeight } = canvas.current;
    const k = offsetWidth / offsetHeight; //窗口宽高比
    switch (config.camera) {
      case "OrthographicCamera":
        camera.current = new THREE.OrthographicCamera(
          -config.cConfig.ratio * k,
          config.cConfig.ratio * k,
          config.cConfig.ratio,
          -config.cConfig.ratio,
          1,
          1000
        );
        break;
      case "PerspectiveCamera":
        camera.current = new THREE.PerspectiveCamera(config.fov, k, 1, 1000);
        break;
      default:
        break;
    }
    camera.current.position.set(200, 300, 200); //设置相机位置
    camera.current.lookAt(scene.current.position); //设置相机方向(指向的场景对象)
    render();
  };

  useEffect(() => {
    if (
      JSON.stringify(config.cConfig) ===
      JSON.stringify(configRef.current.cConfig)
    )
      return;
    addCamera();
  }, [config.cConfig]);

  // 初始化画布 定义场景 模型 光源 相机 渲染器和控制器等
  const init = () => {
    // 创建场景对象
    scene.current = new THREE.Scene();
    // 设置光源
    const point = new THREE.PointLight(0xffffff); //点光源
    point.position.set(400, 200, 300); //点光源位置
    const ambient = new THREE.AmbientLight(0x444444); //环境光
    scene.current.add(point);
    scene.current.add(ambient);
    // 设置相机
    addCamera();
    // 创建渲染器对象
    if (!canvas.current) return;
    const { offsetWidth, offsetHeight } = canvas.current;
    renderer.current = new THREE.WebGLRenderer();
    renderer.current.setSize(offsetWidth, offsetHeight); //设置渲染区域尺寸 设置输出canvas的尺寸
    renderer.current.setClearColor(0xb9d3ff, 1); //设置背景颜色
    renderer.current.setPixelRatio(window.devicePixelRatio); // 兼容高清屏幕
    canvas.current.appendChild(renderer.current.domElement); //body元素中插入canvas对象
    // renderer.current.render(scene.current, camera.current); //执行渲染操作   指定场景、相机作为参数

    // 创建轨道控制器操作3d物体 使鼠标拖动旋转
    const controls = new OrbitControls(
      camera.current,
      renderer.current.domElement
    );
    render();
    // controls.addEventListener("change", render); //监听轨道改变
    addModel();
  };
  // 页面缩放
  const windowResize = debounce(() => {
    if (!canvas.current) return;
    const { offsetWidth, offsetHeight } = canvas.current;
    camera.current.aspect = offsetWidth / offsetHeight;
    camera.current.updateProjectionMatrix();
    renderer.current.setSize(offsetWidth, offsetHeight);
  }, 300);
  // 组件销毁时操作
  const componentWillUnmount = () => {
    window.removeEventListener("resize", windowResize);
    // clearScene();
  };
  useEffect(() => {
    if (!canvas.current) return;
    window.addEventListener("resize", windowResize);
    init();
    return componentWillUnmount;
  }, []);

  return (
    <div className={styles["three-config"]}>
      <div ref={canvas} className={styles["three-canvas"]}></div>
      <div className={styles["three-conf"]}>
        <Collapse accordion>
          <Collapse.Panel key={1} header="场景">
            <Checkbox
              checked={config.isShowAxes}
              onChange={(e) => changeConfig(e.target.checked, "isShowAxes")}
            >
              辅助坐标系
            </Checkbox>
          </Collapse.Panel>
          <Collapse.Panel key={2} header="模型">
            <Model config={config} changeConfig={changeConfig} />
          </Collapse.Panel>
          <Collapse.Panel key={3} header="光源"></Collapse.Panel>
          <Collapse.Panel key={4} header="相机">
            <Camera config={config} changeConfig={changeConfig} />
          </Collapse.Panel>
          <Collapse.Panel key={5} header="渲染器"></Collapse.Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default ThreeConfig;
