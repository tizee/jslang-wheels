/**
 * A super silly throttle that invoking the func in trailing edge of timer
 */
function throttle(func, wait) {
  let timerId, thisArg, lastArgs, result;
  const later = () => {
    if (lastArgs) {
      result = func.apply(thisArg, lastArgs);
    }
    // reset context
    timerId = undefined;
    thisArg = lastArgs = undefined;
  };
  return function (...args) {
    // update context
    thisArg = this;
    lastArgs = args;
    if (!timerId) {
      timerId = setTimeout(later, wait);
    }
    return result;
  };
}
