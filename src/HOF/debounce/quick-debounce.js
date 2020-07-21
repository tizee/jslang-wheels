/**
 *  see https://codepen.io/qtizee/pen/JjGwBbx
 * A debounce funtion for quick implementation
    1. If leading and trailing options are true, func is invoked on the trailing edge of the timeout only if the debounced function is invoked more than once during the wait timeout.
 */
function debounce(func, wait, option) {
  let lastTime, timerId, leading, trailing, thisArg, lastArgs, result;
  if (!option) {
    option = {};
    leading = false;
    trailing = true;
  } else {
    leading = !!option.leading;
    trailing = !!option.trailing;
  }
  const later = () => {
    const waiting = Date.now() - lastTime;
    // trailing edge of timer
    if (waiting >= 0 && waiting < wait) {
      // continue wait
      timerId = setTimeout(later, waiting);
    } else {
      // invoke now
      timerId = undefined;
      if (trailing && lastArgs) {
        result = func.apply(thisArg, lastArgs);
      }
      thisArg = lastArgs = undefined;
    }
    return result;
  };
  return function (...args) {
    lastTime = Date().now();
    thisArg = this;
    lastArgs = args;
    // has a timer running
    if (timerId) {
      clearTimeout(timerId);
    }
    // start new timer for invoke func
    const callNow = !timerId && option.immediate;
    if (callNow || (leading && !timerId)) {
      result = func.apply(this, args);
      thisArg = lastArgs = undefined;
    }
    if (!timerId) {
      // lock for next wait milliseconds
      // trailing edge
      timerId = setTimeout(later, wait);
    }
    return result;
  };
}
