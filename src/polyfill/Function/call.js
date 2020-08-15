// call is identical to apply but it uses arguments
const $call = function (thisArg) {
  thisArg = thisArg || window;
  let uid = '$0x' + Math.random() + Date.now();
  while (thisArg.hasOwnProperty(uid)) {
    uid = '$0x' + Math.random() + Date.now();
  }
  thisArg[uid] = this;
  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`);
  }
  // use curry function?
  let res = eval(`thisArg[uid](${args.join(',')})`);
  delete thisArg[uid];
  return res;
};

export { $call };
