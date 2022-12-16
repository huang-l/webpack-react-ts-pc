// 模型类型
export const modelTypes = [
  { key: "point", value: "点模型" },
  { key: "line", value: "线模型" },
  { key: "mesh", value: "网格模型" },
];
// 几何体类型
export const geometryTypes = [
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
  { key: "ExtrudeGeometry", value: "拉伸、扫描" },
  { key: "LatheGeometry", value: "旋转" },
  { key: "TubeGeometry", value: "管道" },
  { key: "ShapeGeometry", value: "轮廓填充" },
  { key: "TextGeometry", value: "文字" },
  { key: "ParametricGeometry", value: "参数化曲面" },
];
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
