const SlimPromise = require('../../dist/promise/index').default;

let p1 = SlimPromise.resolve(1);
p1.then((res) => {
  console.log(res);
});
let p2 = SlimPromise.resolve(
  new SlimPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    });
  })
);
p2.then((res) => {
  console.log(res);
});
let p3 = SlimPromise.reject(3);
p3.catch((err) => {
  console.log(err);
});
let arr = SlimPromise.race([
  new SlimPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(4);
    }, 200);
  }),
  new SlimPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(5);
    }, 500);
  }),
]);
arr.then((res) => {
  console.log(res);
}); // 4
// all
let p6 = new SlimPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(6);
  }, 100);
});
let p7 = new SlimPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(7);
  }, 500);
});
SlimPromise.all([p6, p7]).then((val) => {
  console.log(val); // [6,7]
});
let p8 = new SlimPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(9);
  });
});
p8.then((val) => {
  console.log(val);
  return val + 1;
})
  .finally(() => {
    console.log('finally');
  })
  .then((val) => {
    console.log(val);
  });
// 9->finally->10
