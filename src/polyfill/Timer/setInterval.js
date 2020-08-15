let idx = 0;
const queue = new Map();
function _setInterval(fn, wait) {
  const intervalId = idx++;
  const job = () => {
    const id = setTimeout(() => {
      job();
      fn();
    }, wait);
    if (!queue.has(intervalId)) {
      queue.set(intervalId, []);
    }
    const ids = queue.get(intervalId);
    ids.push(id);
  };
  job();
  return intervalId;
}

function _clearInterval(intervalId) {
  const ids = queue.get(intervalId);
  for (let id of ids) {
    clearTimeout(id);
  }
}

let count = 10;
let iid = _setInterval(() => {
  console.log(count++);
}, 0);
_clearInterval(iid);
