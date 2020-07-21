/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked.
 * 1.  If leading and trailing options are true, func is invoked on the trailing edge of the timeout only if the debounced function is invoked more than once during the wait timeout.
 * 2. If wait is 0 and leading is false, func invocation is deferred until to the next tick, similar to setTimeout with a timeout of 0.
 */
function debounce(fn, wait, option) {
  let lastTime, lastThis, lastArgs, result, leading, trailing, timerId;

  if (typeof option === 'object') {
    leading = !!option.leading;
    trailing = 'trailing' in option ? !!option.trailing : true;
  }

  function invokeFunc() {
    result = func.apply(lastThis, lastArgs);
    lastThis = lastArgs = undefined;
    return result;
  }

  function leadingEdge() {
    if (leading && !timerId) {
      invokeFunc();
    }
    trailingEdge();
    return result;
  }

  function trailingEdge() {
    const waiting = Date.now() - lastTime;
    if (waiting >= 0 && waiting < wait) {
      timerId = setTimeout(trailingEdge, waiting);
    } else {
      timerId = undefined;
      if (trailing && lastArgs) {
        return invokeFunc();
      }
      lastThis = lastArgs = undefined;
    }
    return result;
  }

  function debounced(...args) {
    // update context
    lastTime = Date.now();
    lastThis = this;
    lastArgs = args;
    // has timer running
    if (timerId) {
      clearTimeout(timerId);
    }
    return leadingEdge();
  }
  return debounced;
}

const Debounce = (wait, option) => (target, name, descriptor) => {
  const oldVal = descriptor.value;
  descriptor.value = debounce(oldVal, wait, option);
};

export { debounce, Debounce };
