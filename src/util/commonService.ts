// 防抖函数 多次触发一个事件只执行最后一次
export function debounce(fn: Function, time: number) {
  let timer: any = null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(), time);
  };
}
