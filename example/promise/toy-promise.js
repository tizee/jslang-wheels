class ToyPromise {
  constructor(executor) {
    this._resovledQueue = []; // queue for resolved callbacks
    this._rejectedQueue = []; // queue for rejected callbacks
    const handleResolve = (val) => {
      // execute resovled callback
      while (this._resovledQueue.length) {
        const callback = this._resovledQueue.shift();
        callback(val);
      }
    };
    const handleReject = (val) => {
      // execute rejected callback
      while (this._rejectedQueue.length) {
        const callback = this._rejectedQueue.shift();
        callback(val);
      }
    };
    executor(handleResolve, handleReject);
  }

  then(onFulfilled = (val) => {}, onRejected = (val) => {}) {
    if (typeof onFulfilled === 'function') {
      this._resovledQueue.push(onFulfilled);
    }
    if (typeof onRejected === 'function') {
      this._rejectedQueue.push(onRejected);
    }
  }
}

module.exports = ToyPromise;
