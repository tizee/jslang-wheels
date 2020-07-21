/**
 * see https://codepen.io/qtizee/pen/JjGwBbx
 * A quick debounce implementation that invokes func immediately and only continue with no calling for wait millseconds
 * like throttle leading edge
 */
function debounce(func, wait) {
  let timerId, result;
  return function (...args) {
    // invoke at first time
    const callNow = !timerId;
    if (!timerId) {
      timerId = setTimeout(() => {
        timerId = undefined;
      }, wait);
    }
    if (callNow) {
      result = func.apply(this, args);
    }
    return result;
  };
}
