const SlimPromise = require('../dist/API/Promise').default;

SlimPromise.deferred = function () {
  let deferred = {};
  deferred.promise = new SlimPromise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};

module.exports = SlimPromise;
