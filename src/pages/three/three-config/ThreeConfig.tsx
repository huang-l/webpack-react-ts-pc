import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { debounce, cloneDeep } from "lodash";
import { Collapse, Checkbox } from "antd";
import Model from "./config/Model";
import styles from "./ThreeConfig.less";

const ThreeConfig = () => {
  const scene = useRef<any>(null); //场景
  const renderer = useRef<any>(null); //渲染器
  const camera = useRef<any>(null); //相机
  const [modelList, setModelList] = useState<Array<{ [x: string]: string }>>(
    []
  ); //模型列表
  const [isShowAxes, setIsShowAxes] = useState(false);
  const changeModelList = useCallback(
    (val: Array<{ [x: string]: string }>) => setModelList(cloneDeep(val)),
    []
  );
  const render = () => {
    if (!renderer.current || !scene.current || !camera.current) return;
    renderer.current.render(scene.current, camera.current);
    // 渲染下一帧时在调用render函数
    requestAnimationFrame(render);
  };
  useEffect(() => {
    if (scene.current) {
      if (isShowAxes) {
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
  }, [isShowAxes]);
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

  // 模型列表修改时清空原先所有模型 在添加新模型
  useEffect(() => {
    if (!scene.current) return;
    const children: any[] = [];
    scene.current.children.forEach((child: any) => {
      if (child.material && child.geometry && child.type !== "AxesHelper") {
        children.push(child);
      }
    });
    scene.current.remove(...children);
    if (modelList.length) {
      modelList.forEach((model) => {
        let geometry = null;
        switch (model.geometry) {
          case "BoxGeometry":
            geometry = new THREE.BoxGeometry(100, 100, 100);
            break;
          case "CylinderGeometry":
            geometry = new THREE.CylinderGeometry(50, 50, 200, 32);
            break;
          case "SphereGeometry":
            geometry = new THREE.SphereGeometry(15, 32, 16);
            break;
          case "ConeGeometry":
            geometry = new THREE.ConeGeometry(50, 200, 32);
            break;
          case "TetrahedronGeometry":
            geometry = new THREE.TetrahedronGeometry(100, 0);
            break;
          case "OctahedronGeometry":
            geometry = new THREE.OctahedronGeometry(100, 0);
            break;
          case "DodecahedronGeometry":
            geometry = new THREE.DodecahedronGeometry(100, 0);
            break;
          case "IcosahedronGeometry":
            geometry = new THREE.IcosahedronGeometry(100, 0);
            break;
          case "RingGeometry":
            geometry = new THREE.RingGeometry(10, 50, 32);
            break;
          case "PlaneGeometry":
            geometry = new THREE.PlaneGeometry(10, 10);
            break;
          case "CircleGeometry":
            geometry = new THREE.CircleGeometry(50, 32);
            break;
          default:
            break;
        }
        if (!geometry) return;
        let material = null;
        let object = null;
        switch (model.model) {
          case "point":
            material = new THREE.PointsMaterial({
              color: 0xff0000,
              size: 5.0, //点对象像素尺寸
            });
            object = new THREE.Points(geometry, material);
            break;
          case "line":
            material = new THREE.LineBasicMaterial({
              color: 0xff0000, //线条颜色
            });
            object = new THREE.Line(geometry, material);
            break;
          case "mesh":
            material = new THREE.MeshLambertMaterial({
              color: 0x0000ff, //三角面颜色
            });
            object = new THREE.Mesh(geometry, material);
            break;
          default:
            break;
        }
        object && scene.current.add(object);
      });
    }
    renderer.current.render(scene.current, camera.current);
  }, [modelList]);

  // 渲染三维模型
  const renderThree = (canvas: HTMLElement) => {
    // 1.创建场景对象
    scene.current = new THREE.Scene();
    // 2.创建网格模型 几何体+材质
    const geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    const material = new THREE.MeshLambertMaterial({ color: 0x0000ff }); //材质对象Material
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.current.add(mesh); //网格模型添加到场景中
    // 3.设置光源
    const point = new THREE.PointLight(0xffffff); //点光源
    point.position.set(400, 200, 300); //点光源位置
    const ambient = new THREE.AmbientLight(0x444444); //环境光
    scene.current.add(point);
    scene.current.add(ambient);
    // 4.设置相机
    const { offsetWidth, offsetHeight } = canvas;
    const k = offsetWidth / offsetHeight; //窗口宽高比
    const s = 200; //三维场景显示范围控制系数 系数越大 显示的范围越大
    camera.current = new THREE.OrthographicCamera(
      -s * k,
      s * k,
      s,
      -s,
      1,
      1000
    );
    camera.current.position.set(200, 300, 200); //设置相机位置
    camera.current.lookAt(scene.current.position); //设置相机方向(指向的场景对象)
    // 5.创建渲染器对象
    renderer.current = new THREE.WebGLRenderer();
    renderer.current.setSize(offsetWidth, offsetHeight); //设置渲染区域尺寸 设置输出canvas的尺寸
    renderer.current.setClearColor(0xb9d3ff, 1); //设置背景颜色
    renderer.current.setPixelRatio(window.devicePixelRatio); // 兼容高清屏幕
    canvas.appendChild(renderer.current.domElement); //body元素中插入canvas对象
    // renderer.current.render(scene.current, camera.current); //执行渲染操作   指定场景、相机作为参数

    // 创建轨道控制器操作3d物体 使鼠标拖动旋转
    const controls = new OrbitControls(
      camera.current,
      renderer.current.domElement
    );
    render();
    // controls.addEventListener("change", render); //监听轨道改变
  };
  // 页面缩放
  const windowResize = debounce(() => {
    const canvas = document.getElementById("three-canvas");
    if (!canvas) return;
    const { offsetWidth, offsetHeight } = canvas;
    renderer.current.setSize(offsetWidth, offsetHeight);
  }, 300);
  // 组件销毁时操作
  const componentWillUnmount = () => {
    window.removeEventListener("resize", windowResize);
    // clearScene();
  };
  useEffect(() => {
    const canvas = document.getElementById("three-canvas");
    if (!canvas) return;
    window.addEventListener("resize", windowResize);
    renderThree(canvas);
    return componentWillUnmount;
  }, []);

  return (
    <div className={styles["three-config"]}>
      <div id="three-canvas" className={styles["three-canvas"]}></div>
      <div className={styles["three-conf"]}>
        <Collapse accordion>
          <Collapse.Panel key={1} header="场景">
            <Checkbox
              checked={isShowAxes}
              onChange={(e) => setIsShowAxes(e.target.checked)}
            >
              辅助坐标系
            </Checkbox>
          </Collapse.Panel>
          <Collapse.Panel key={2} header="模型">
            <Model modelList={modelList} changeModelList={changeModelList} />
          </Collapse.Panel>
          <Collapse.Panel key={3} header="光源"></Collapse.Panel>
          <Collapse.Panel key={4} header="相机"></Collapse.Panel>
          <Collapse.Panel key={5} header="渲染器"></Collapse.Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default ThreeConfig;
