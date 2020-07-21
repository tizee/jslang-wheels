/**
 * A throttle function for quick implementation
 * see https://codepen.io/qtizee/pen/pogqKvv
 */

function throttle(fn, wait, option) {
  let lastCalled = 0;
  let lastThis, lastArgs, timerId, result, leading, trailing;
  if (!option) {
    leading = true;
    trailing = true;
  } else {
    leading = !!option.leading;
    trailing = 'trailing' in option ? option.trailing : false;
  }
  const lock = () => {
    const now = Date.now();
    if (trailing && lastArgs) {
      lastCalled = now;
      timerId = undefined;
      result = fn.apply(lastThis, lastArgs);
    }
    // reset context
    lastThis = lastArgs = undefined;
    return result;
  };
  return function (...args) {
    const now = Date.now();
    const waiting = wait - (now - lastCalled);
    lastThis = this;
    lastArgs = args;
    if (!lastCalled || waiting <= 0) {
      if (leading) {
        if (timerId) {
          // clear timerId
          clearTimeout(timerId);
          timerId = undefined;
        }
        lastCalled = now;
        result = fn.apply(this, args);
        lastThis = lastArgs = undefined;
      } else if (!timerId && trailing) {
        // delay to timer trailing edge
        timerId = setTimeout(lock, wait);
      }
    }
    return result;
  };
}
