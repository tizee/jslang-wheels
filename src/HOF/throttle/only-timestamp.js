/**
 * A super silly throttle that invokes the func in leading edge
 */
function throttle(func, wait) {
  let lastTime;
  return function (...args) {
    const now = Date.now();
    if (!lastTime || now - lastTime >= wait) {
      lastTime = now;
      return func.apply(this, args);
    }
    return result;
  };
}
