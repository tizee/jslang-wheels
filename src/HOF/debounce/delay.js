/**
 * A debounce function for quick implmentation that only needs to delay
 * https://codepen.io/qtizee/pen/JjGwBbx
 */
function debounce(func, wait) {
  let timerId, lastArgs, lastThis, result;
  const later = () => {
    if (lastArgs) {
      result = func.apply(lastThis, lastArgs);
    }
    lastArgs = lastThis = undefined;
  };
  return function (...args) {
    lastThis = this;
    lastArgs = args;
    if (timerId) {
      // reset
      clearTimeout(timerId);
      timerId = undefined;
    }
    timerId = setTimeout(later, wait);
    return result;
  };
}
