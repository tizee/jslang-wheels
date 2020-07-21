/**
 *If leading and trailing options are true, func is invoked on the trailing edge of the timeout only if the throttled function is invoked more than once during the wait timeout.
 * If wait is 0 and leading is false, func invocation is deferred until to the next tick, similar to setTimeout with a timeout of 0.
 *
 * @param {*} func
 * @param {*} wait
 * @param {*} options
 * @returns
 */
function throttle(func, wait, options) {
  let lastTimeInvoked = 0;
  let timerId, result, lastArgs, lastThis, lastTimeCalled, leading, trailing;
  if (typeof options === 'object') {
    leading = !!options.leading;
    trailing = options.trailing !== undefined ? !!options.trailing : true;
  } else {
    leading = false;
    trailing = true;
  }

  // apply func using cached lastArgs and lastThisArg
  function invokeFn(time) {
    const [thisArg, args] = [lastThis, lastArgs];
    lastTimeInvoked = time;
    // reset
    lastThis = lastArgs = undefined;
    // update result
    result = func.apply(thisArg, args);
    return result;
  }

  function timeExpired() {
    const now = Date.now();
    clearTimeout(timerId);
    timerId = undefined;
    if (shouldInvoke(now)) {
      trailingEdge(now);
    }
  }

  function trailingEdge(time) {
    if (trailing && lastArgs) {
      return invokeFn(time);
    }
    // reset
    lastArgs = lastThis = undefined;
    return result;
  }

  function leadingEdge(time) {
    lastTimeInvoked = time;
    timerId = setTimeout(timeExpired, wait);
    return leading ? invokeFn(time) : result;
  }

  function shouldInvoke(time) {
    const timeSinceLastInvoked = time - lastTimeInvoked;
    const timeSinceLastCalled = time - lastTimeCalled;
    return (
      lastTimeCalled === undefined ||
      timeSinceLastCalled >= wait ||
      timeSinceLastInvoked >= wait
    );
  }

  function throttled(...args) {
    const now = Date.now();

    const canInvoke = shouldInvoke(now);
    // update context
    lastArgs = args;
    lastThis = this;
    lastTimeCalled = now;

    if (canInvoke) {
      return leadingEdge(now);
    }
    return result;
  }

  return throttled;
}

/** class method decorator */
const Throttle = (wait, options) => (target, name, descriptor) => {
  const oldVal = descriptor.value;
  descriptor.value = throttle(oldVal, wait, options);
};

export { throttle, Throttle };
