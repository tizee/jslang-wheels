/**
 * A quick debounce implementation that invokes func immediately and only continue with no calling for wait millseconds
 * like throttle leading edge
 */
function debounce(func, wait) {
  let immediate = true;
  let timerId, result;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      immediate = true;
      timerId = undefined;
    }, wait);
    if (immediate) {
      result = func.apply(this, args);
      immediate = false;
    }
    return result;
  };
}
