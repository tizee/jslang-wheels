const { createNamedExports } = require('typescript');

let p1 = Promise.resolve(1);
p1.then((res) => {
  console.log(res);
});
let p2 = Promise.resolve(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    });
  })
);
p2.then((res) => {
  console.log(res);
});
let p3 = Promise.reject(3);
p3.catch((err) => {
  console.log(err);
});

let arr = Promise.race([
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(4);
    }, 200);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(5);
    }, 500);
  }),
]);
arr.then((res) => {
  console.log(res);
}); // 4

// all
let p6 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(6);
  }, 100);
});
let p7 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(7);
  }, 500);
});
Promise.all([p6, p7]).then((val) => {
  console.log(val); // [6,7]
});
