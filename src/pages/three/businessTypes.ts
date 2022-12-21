// 模型类型
export const modelTypes = [
  { key: "point", value: "点模型" },
  { key: "line", value: "线模型" },
  { key: "mesh", value: "网格模型" },
];
// 几何体类型
export const geometryTypes = [
  { key: "BufferGeometry", value: "自定义" },
  { key: "BoxGeometry", value: "长方体" },
  { key: "CylinderGeometry", value: "圆柱体" },
  { key: "SphereGeometry", value: "球体" },
  { key: "ConeGeometry", value: "圆锥、棱锥" },
  { key: "TetrahedronGeometry", value: "正四面体" },
  { key: "OctahedronGeometry", value: "正八面体" },
  { key: "DodecahedronGeometry", value: "正十二面体" },
  { key: "IcosahedronGeometry", value: "正二十面体" },
  { key: "RingGeometry", value: "环平面" },
  { key: "PlaneGeometry", value: "矩形平面" },
  { key: "CircleGeometry", value: "圆平面" },
];
export const geometryConfigs = {
  BufferGeometry: {
    pointList: [
      { key: "1", x: 0, y: 0, z: 0 },
      { key: "2", x: 50, y: 0, z: 0 },
      { key: "3", x: 0, y: 100, z: 0 },
      { key: "4", x: 0, y: 0, z: 0 },
      { key: "5", x: 0, y: 0, z: 100 },
      { key: "6", x: 50, y: 0, z: 0 },
    ],
    normalList: [
      { key: "1", x: 0, y: 0, z: 1 },
      { key: "2", x: 0, y: 0, z: 1 },
      { key: "3", x: 0, y: 0, z: 1 },
      { key: "4", x: 0, y: 1, z: 0 },
      { key: "5", x: 0, y: 1, z: 0 },
      { key: "6", x: 0, y: 1, z: 0 },
    ],
  },
  BoxGeometry: {
    width: 100,
    height: 100,
    depth: 100,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
  },
  CylinderGeometry: {
    radiusTop: 100,
    radiusBottom: 100,
    height: 100,
    radialSegments: 8,
    heightSegments: 8,
  },
  SphereGeometry: { radius: 100, widthSegments: 32, heightSegments: 16 },
  ConeGeometry: {
    radius: 100,
    height: 100,
    radialSegments: 8,
    heightSegments: 1,
  },
  TetrahedronGeometry: { radius: 100, detail: 1 },
  OctahedronGeometry: { radius: 100, detail: 1 },
  DodecahedronGeometry: { radius: 100, detail: 1 },
  IcosahedronGeometry: { radius: 100, detail: 1 },
  RingGeometry: {
    innerRadius: 10,
    outerRadius: 100,
    thetaSegments: 8,
    phiSegments: 8,
  },
  PlaneGeometry: {
    width: 100,
    height: 100,
    widthSegments: 1,
    heightSegments: 1,
  },
  CircleGeometry: { radius: 100, segments: 32 },
};
// 材质类型
export const materialTypes = [
  { key: "PointsMaterial", value: "点材质" },
  { key: "LineBasicMaterial", value: "线基础材质" },
  { key: "LineDashedMaterial", value: "虚线材质" },
  { key: "MeshBasicMaterial", value: "网格基础材质" },
  { key: "MeshLambertMaterial", value: "网格Lambert材质(暗淡、漫反射)" },
  { key: "MeshPhongMaterial", value: "网格Phong材质(高亮表面、镜面反射)" },
  { key: "MeshStandardMaterial", value: "PBR材质(standard)" },
  { key: "MeshPhysicalMaterial", value: "PBR材质(physical)" },
  { key: "MeshDepthMaterial", value: "网格深度材质" },
  { key: "MeshNormalMaterial", value: "网格法向量材质" },
];
export const materialConfigs = {
  PointsMaterial: { color: "#ff0000" },
  LineBasicMaterial: { color: "#0000ff" },
  LineDashedMaterial: { color: "#0000ff" },
  MeshBasicMaterial: { color: "#0000ff" },
  MeshLambertMaterial: { color: "#0000ff" },
  MeshPhongMaterial: { color: "#0000ff" },
  MeshStandardMaterial: { color: "#0000ff" },
  MeshPhysicalMaterial: { color: "#0000ff" },
  MeshDepthMaterial: { color: "#0000ff" },
  MeshNormalMaterial: { color: "#0000ff" },
};
export const cameraTypes = [
  { key: "OrthographicCamera", value: "正交摄像机" },
  { key: "PerspectiveCamera", value: "透视摄像机" },
];
export const cameraConfigs = {
  OrthographicCamera: { ratio: 200 },
  PerspectiveCamera: { fov: 45 },
};
