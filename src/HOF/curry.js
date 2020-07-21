// a simple curry transformer
function createCurry(fn, ...args) {
  if (fn.length > 0) {
    if (args.length >= fn.length) {
      // invoke when satisfy
      return fn.apply(null, args);
    } else {
      // return a wrap function when parameters partially applied
      return function (..._args) {
        return createCurry(fn, ...args, ..._args);
      };
    }
  } else {
    // without parameters or only rest parameters
    return fn;
  }
}

function curry(fn) {
  if (typeof fn !== 'function') {
    throw TypeError('not a function');
  }
  return createCurry(fn);
}

export default curry;
