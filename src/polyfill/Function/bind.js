// see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
// The bind() function creates a new bound function, which is an exotic function object (a term from ECMAScript 2015) that wraps the original function object. Calling the bound function generally results in the execution of its wrapped function.
// 1. [[BoundTargetFunction]]: the wrapped function object
// 2. [[BoundThis]]: The value that is always passed as this value when calling the wrapped function.
// 3. [[BoundArguments]]: A list of values whose elements are used as the first arguments to any call to the wrapped function.
// 4. [[Call]]: Executes code associated with this object. Invoked via a function call expression. The arguments to the internal method are a this value and a list containing the arguments passed to the function by a call expression.
// When a bound function is called, it calls internal method [[Call]] on [[BoundTargetFunction]], with following arguments Call(boundThis, ...args). Where boundThis is [[BoundThis]], args is [[BoundArguments]], followed by the arguments passed by the function call.
// Corner case:
// What would happen if use new operator to consturct the returned function: A bound function may also be constructed using the new operator. Doing so acts as though the target function had instead been constructed. The provided this value is ignored, while prepended arguments are provided to the emulated function.

/**
 *
 * @param {BoundThis} thisArg
 * @param  {BoundArguments} argsArr
 * @returns {Function} exotic function obj
 */
const $bind = function (thisArg, ...argsArr) {
  // get original function's this pointer at the beginning
  let thatFunc = this,
    boundArguments = argsArr;
  if (typeof thatFunc !== 'function') {
    throw TypeError('$bind: what is trying to bound is not callable');
  }
  // use a empty function object to isolate boundFunc and the called function
  let defaultFunc = function () {};
  // exotic function (warpper for the real function)
  let boundFunc = function () {
    let args = boundArguments.concat(Array.prototype.slice.call(arguments));
    // using new would cause the this pointer point to the new created function obj
    if (this instanceof boundFunc) {
      return thatFunc.apply(this, args);
    } else {
      return thatFunc.apply(thisArg, args);
    }
  };
  if (thatFunc.prototype) {
    defaultFunc.prototype = thatFunc.prototype;
  }
  // boundFunc.prototype -> defaultFunc instance
  // defaultFunc instance _proto_ -> calledFunc.protoype
  boundFunc.prototype = new defaultFunc();
  return boundFunc;
};

export { $bind };
