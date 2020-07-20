function reduce(fn, initVal) {
  const arr = [...this.values()];
  let val = initVal;
  for (let index = 0; index < arr.length; index++) {
    const el = arr[index];
    val = fn(val, el, index, arr);
  }
  return val;
}

export default reduce;
