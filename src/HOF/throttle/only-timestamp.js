/**
 * A super silly throttle that invokes the func in leading edge
 */
function throttle(func, wait) {
  let lastTime, result;
  return function (...args) {
    const now = Date.now();
    // first time or wait for a long long time
    if (!lastTime || now - lastTime >= wait) {
      lastTime = now;
      result = func.apply(this, args);
    }
    return result;
  };
}
