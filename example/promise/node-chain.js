const log = console.log;

log('main program enter');
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  });
});

setTimeout(() => {
  log('hello');
});

let end = p1
  .then((res) => {
    console.log(res);
    return res + 1;
  })
  .then((res) => {
    console.log(res);
    return res + 1;
  })
  .then((res) => {
    console.log(res);
    throw new Error('An Error');
  })
  .then((res) => {
    console.log(res);
    return res + 1;
  })
  .then((res) => {
    console.log(res);
    return res + 1;
  })
  .catch((error) => {
    log(error.message);
  });

log('main program exit');

/**
Output order:
main program enter
main program exit
hello
1
2
3
An Error
 */
