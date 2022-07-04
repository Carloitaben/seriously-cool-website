export function throttle(func: Function, duration: number) {
  let shouldWait = false
  return function (this: unknown, ...args: unknown[]) {
    if (!shouldWait) {
      func.apply(this, args)
      shouldWait = true
      setTimeout(function () {
        shouldWait = false
      }, duration)
    }
  }
}
