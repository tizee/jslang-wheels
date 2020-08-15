// 1. Why apply?
//  With apply, you can write a method once, and then inherit it in another object, without having to rewrite the method for the new object.
// 2. Parameters
// thisArg: Note that this may not be the actual value seen by the method: if the method is a function in non-strict mode code, null and undefined will be replaced with the global object, and primitive values will be boxed. This argument is required.
// argsArr: An array-like object, specifying the arguments with which func should be called, or null or undefined if no arguments should be provided to the function.
const $apply = function (thisArg, argsArr) {
  thisArg = thisArg || window;
  let thatFunc = this,
    thatArgs = argsArr;
  // could use uuid
  let uid = '$0x' + Math.random() + Date.now();
  while (thisArg.hasOwnProperty(uid)) {
    uid = '$0x' + Math.random() + Date.now();
  }
  thisArg[uid] = thatFunc;
  let res;
  if (thatArgs && thatArgs.length) {
    res = thisArg[uid](thatArgs);
  } else {
    res = thisArg[uid];
  }
  delete thisArg[uid];
  return res;
};

export { $apply };
