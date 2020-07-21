/**
 * A super silly throttle that invoking the func in trailing edge of timer
 */
function throttle(func, wait) {
  let timerId, thisArg, lastArgs, result;
  const later = () => {
    if (lastArgs) {
      result = func.apply(thisArg, lastArgs);
    }
    timerId = undefined;
    thisArg = lastArgs = undefined;
  };
  return function (...args) {
    thisArg = this;
    lastArgs = args;
    if (!timerId) {
      timerId = setTimeout(later, wait);
    }
    return result;
  };
}
