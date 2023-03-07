export const throttle = (fn: Function, time: number) => {
  let timer: any = null
  return () => {
    if (timer) {
      return
    } else {
      fn()
      timer = setTimeout(() => {
        timer = null
      }, time)
    }
  }
}
