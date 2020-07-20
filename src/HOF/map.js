function map(fn) {
  const result = [];
  const arr = [...this.values()];
  for (let index = 0; index < arr.length; index++) {
    const el = arr[index];
    result.push(fn(el, index, arr));
  }
  return result;
}

export default map;
