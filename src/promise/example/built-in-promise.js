let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 0);
});

// event-loop
setTimeout(() => {
  console.log(3);
}, 1000);

p1.then((result) => {
  console.log(result);
});

p2.then((val) => {
  console.log(val);
});

// order => 2->1->3
