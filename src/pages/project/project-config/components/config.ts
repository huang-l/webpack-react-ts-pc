const modules: any = [];
const files = require.context("../components", true, /default\.ts$/);
files.keys().forEach((key: string) => {
  const module = files(key).default;
  if (!modules.find((m: { key: string }) => m.key === module.key)) {
    modules.push(module);
  }
});
export const compSvgList = modules.map(
  (item: { key: string; svg: string }) => ({
    key: item.key,
    src: item.svg,
  })
);

export const boxConfigList = modules.map(
  (item: { key: string; [x: string]: any }) => ({
    key: item.key,
    ...item.boxConfig,
  })
);

export const contentConfigList = modules.map(
  (item: { key: string; contentConfig: { [x: string]: any } }) => ({
    key: item.key,
    config: { ...item.contentConfig },
  })
);
