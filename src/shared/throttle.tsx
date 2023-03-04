export const throttle = (fn: Function, time: number) => {
  let timer: number | null = null;
  return () => {
    if (timer) {
      return;
    } else {
      fn();
      timer = setTimeout(() => {
        timer = null;
      }, time);
    }
  };
};
