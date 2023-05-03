const modules: any = [];
const files = require.context("../components", true, /default\.ts$/);
files.keys().forEach((key: string) => {
  const module = files(key).default;
  if (!modules.find((m: { key: string }) => m.key === module.key)) {
    modules.push(module);
  }
});
export const compTextList = modules.map(
  (item: { key: string; text: string }) => ({
    key: item.key,
    text: item.text,
  })
);

export const boxConfigList = modules.map(
  (item: { key: string; [x: string]: any }) => ({
    key: item.key,
    text: item.text,
    ...item.boxConfig,
  })
);

export const contentConfigList = modules.map(
  (item: { key: string; contentConfig: { [x: string]: any } }) => ({
    key: item.key,
    config: { ...item.contentConfig },
  })
);
