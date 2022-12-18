let geometryModules = {};
const geometryFiles = require.context("./geometry", true, /Geometry\.tsx$/);
geometryFiles.keys().forEach((key: string) => {
  geometryModules = Object.assign(geometryModules, geometryFiles(key).default);
});
let materialModules = {};
const materialFiles = require.context("./material", true, /Material\.tsx$/);
materialFiles.keys().forEach((key: string) => {
  materialModules = Object.assign(materialModules, materialFiles(key).default);
});
export const geometryConfig = geometryModules;
export const materialConfig = materialModules;
