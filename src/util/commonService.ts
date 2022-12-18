export const hexToNum = (hex: string) => parseInt(hex.slice(1), 16);

export const numToHex = (num: number) => {
  return `#${num.toString(16)}`;
};
