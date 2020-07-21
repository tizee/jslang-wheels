/**
 * A debounce funtion for quick implementation
    1. If leading and trailing options are true, func is invoked on the trailing edge of the timeout only if the debounced function is invoked more than once during the wait timeout.
 */
function debounce(func, wait, option) {
  let lastTime = 0,
    immediate = true;
  let timerId, leading, trailing, thisArg, lastArgs, result;
  if (!option) {
    option = {};
    leading = false;
    trailing = true;
  } else {
    leading = !!option.leading;
    trailing = !!option.trailing;
  }
  const later = () => {
    // trailing edge of timer
    timerId = undefined;
    if (trailing && lastArgs) {
      lastTime = Date.now();
      result = func.apply(thisArg, lastArgs);
    }
    thisArg = lastArgs = undefined;
    return result;
  };
  return function (...args) {
    thisArg = this;
    lastArgs = args;
    // has a timer running
    if (timerId) {
      clearTimeout(timerId);
    }
    if (option.immediate) {
      // start new timer for invoke func
      timerId = setTimeout(() => {
        immediate = true;
      }, wait);
      if (immediate) {
        result = func.apply(this, args);
        immediate = false;
      }
    } else {
      // leading-trailing debounce
      const waiting = Math.min(now - lastTime, wait);
      lastTime = Date.now();
      if (!timerId && leading) {
        result = fn.apply(this, args);
        thisArg = lastArgs = undefined;
      }
      // trailing edge
      timerId = setTimeout(later, waiting);
    }
    return result;
  };
}
