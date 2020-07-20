function filter(predict) {
  const result = [];
  const arr = [...this.values()];
  for (let index = 0; index < arr.length; index++) {
    if (predict(arr[index], index, arr)) {
      result.push(arr[index]);
    }
  }
  return result;
}

export default filter;
