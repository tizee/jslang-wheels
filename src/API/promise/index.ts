// helpers
function isObj(obj): boolean {
  return obj != null && typeof obj === 'object';
}

function isFunc(obj): boolean {
  return typeof obj === 'function';
}

function isThenable(obj): boolean {
  return (isObj(obj) || isFunc(obj)) && 'then' in obj;
}

function isPromise(obj: any): boolean {
  return obj instanceof SlimPromise;
}

function hasNextTick() {
  return typeof process === 'object' && 'nextTick' in process;
}
// platform code
const platformWrapper = (callback) => {
  if (hasNextTick()) {
    process.nextTick(callback);
  } else {
    setTimeout(callback);
  }
};

function resolveSP(p: SlimPromise, x: PromiseLike) {
  /**
   * If x is a thenable, it attempts to make promise adopt the state of x, under the assumption that x behaves at least somewhat like a promise. Otherwise, it fulfills promise with the value x.
   */
  if (p === x) {
    /**
     * If promise and x refer to the same object, reject promise with a TypeError as the reason.
     */
    return p.transition(PROMISE_STATES.rejected, new TypeError('Same Promise'));
  }

  /**
   * 2.3.2 If x is a promise, adopt its state
   * 2.3.2.1 If x is pending, promise must remain pending until x is fulfilled or rejected.
   */
  if (isPromise(x)) {
    if ((x as SlimPromise).state === PROMISE_STATES.fulfilled) {
      return p.transition(PROMISE_STATES.fulfilled, (x as SlimPromise).val);
    } else if ((x as SlimPromise).state === PROMISE_STATES.rejected) {
      return p.transition(PROMISE_STATES.rejected, (x as SlimPromise).reason);
    }
    return x.then(
      (val) => {
        resolveSP(p, val);
      },
      (reason) => {
        p.transition(PROMISE_STATES.rejected, reason);
      }
    );
  }
  if (isThenable(x)) {
    let ignored = false;
    let then;
    try {
      /**
       * 2.3.3 Otherwise, if x is an object or function,
       * 2.3.3.1 Let then be x.then
       * 2.3.3.2 If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.
       * 2.3.3 Otherwise, if x is an object or function
       * Promiselike
       */
      then = x.then;
    } catch (error) {
      return p.transition(PROMISE_STATES.rejected, error);
    }
    try {
      if (isFunc(then)) {
        /**
         * 2.3.3.3 If then is a function, call it with x as this, first argument resolvePromise, and second argument rejectPromise, where:
         * If/when resolvePromise is called with a value y, run [[Resolve]](promise, y).
         *  If/when rejectPromise is called with a reason r, reject promise with r.
         *  If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored.
         */
        const resolvePromise = (y) => {
          if (ignored) return;
          ignored = true;
          resolveSP(p, y);
        };
        const rejectPromise = (reason) => {
          if (ignored) return;
          ignored = true;
          p.transition(PROMISE_STATES.rejected, reason);
        };
        then.call(x, resolvePromise, rejectPromise);
      } else {
        p.transition(PROMISE_STATES.fulfilled, x);
      }
    } catch (error) {
      /**
       * If calling then throws an exception e,
       * If resolvePromise or rejectPromise have been called, ignore it.
       *  Otherwise, reject promise with e as the reason.
       *  2.3.2.2 If/when x is fulfilled, fulfill promise with the same value.
       *  2.3.2.3 If/when x is rejected, reject promise with the same reason.
       *
       */
      if (ignored) return;
      ignored = true;
      p.transition(PROMISE_STATES.rejected, error);
    }
  } else {
    /**
     * 2.3.4 If x is not an object or function, fulfill promise with x.
     */
    p.transition(PROMISE_STATES.fulfilled, x);
  }
}

/**
 * 1.2 “thenable” is an object or function that defines a then method.
 */
interface PromiseLike {
  /**
   * 2.2 A promise’s then method accepts two arguments:
   * 2.2.1 Both onFulfilled and onRejected are optional arguments:
   */
  then(
    onFulfilled?: ((value: any) => any | PromiseLike) | undefined | null,
    onRejected?: ((reason: any) => any | PromiseLike) | undefined | null
  ): PromiseLike;
}

/**
 * 1.3 “value” is any legal JavaScript value (including undefined, a thenable, or a promise).
 */

type PromiseValue = null | undefined | Object | PromiseLike | SlimPromise;
/**
 * 1.4“exception” is a value that is thrown using the throw statement.
 */
type Exception = any;
/**
 * “reason” is a value that indicates why a promise was rejected.
 */

/**
 * A promise must be in one of three states: pending, fulfilled, or rejected.
 */
enum PROMISE_STATES {
  pending,
  fulfilled,
  rejected,
}

interface PromiseExecutor {
  (
    resolve: (value?: unknown) => unknown,
    reject: (reason?: any) => unknown
  ): void;
}

interface Callback {
  onFulfilled: Function;
  onRejected: Function;
  reject: Function;
}

/**
 * 1.1 “promise” is an object or function with a then method whose behavior conforms to Promise/A+ spec.
 */
class SlimPromise implements PromiseLike {
  public state: PROMISE_STATES;
  public val: unknown;
  public reason: unknown;
  private fulfilledQueue: Array<Function>;
  private rejectedQueue: Array<Function>;

  /**
   * 2.3 The Promise Resolution Procedure
   */

  // change state and value
  transition(state: PROMISE_STATES, value: any) {
    platformWrapper(() => {
      if (this.state !== PROMISE_STATES.pending && state === this.state) return;
      // flush all callbacks in the queue
      this.state = state;
      if (state === PROMISE_STATES.fulfilled) {
        this.val = value;
        while (this.fulfilledQueue.length) {
          const cb = this.fulfilledQueue.shift();
          cb(value);
        }
      } else {
        this.reason = value;
        while (this.rejectedQueue.length) {
          const cb = this.rejectedQueue.shift();
          cb(value);
        }
      }
    });
  }

  // the executor is called before the Promise constructor even returns the created object
  public constructor(executor: PromiseExecutor) {
    // init state
    this.state = PROMISE_STATES.pending;
    // execute callback when fulfilled
    this.fulfilledQueue = [];
    this.rejectedQueue = [];
    // execute callback when rejected
    /**
     * 2.1.1 When pending, a promise:
            2.1.1.1 may transition to either the fulfilled or rejected state.
     */
    const handleResolve = (val?: PromiseValue) => {
      platformWrapper(() => {
        this.transition(PROMISE_STATES.fulfilled, val);
      });
      /**
       * When fulfilled, a promise:
       *  must not transition to any other state.
       *  must have a value, which must not change.
       */
      // use default onFulfilled and onRejected for non-Promise value
    };
    const handleReject = (reason?: any) => {
      platformWrapper(() => {
        this.transition(PROMISE_STATES.rejected, reason);
      });
    };
    try {
      executor(handleResolve, handleReject);
    } catch (error) {
      handleReject(error);
    }
  }

  invokeCallback(next: SlimPromise, callback: Callback) {
    let { onFulfilled, onRejected, reject } = callback;
    // current promise: onFulfilled, onRejected,
    // next promise: resolve, reject
    try {
      if (this.state === PROMISE_STATES.fulfilled) {
        if (isFunc(onFulfilled)) {
          let res = onFulfilled(this.val);
          resolveSP(next, res);
        } else {
          resolveSP(next, this.val as PromiseLike);
        }
      } else if (this.state === PROMISE_STATES.rejected) {
        if (isFunc(onRejected)) {
          let res = onRejected(this.reason);
          resolveSP(next, res);
        } else {
          reject(this.reason);
        }
      }
    } catch (error) {
      reject(error);
    }
  }
  /**
   * 2.2.7 then must return a promise
   * In practice, this requirement ensures that onFulfilled and onRejected execute asynchronously, after the event loop turn in which then is called, and with a fresh stack. This can be implemented with either a “macro-task” mechanism such as setTimeout or setImmediate, or with a “micro-task” mechanism such as MutationObserver or process.nextTick
   *
   */
  public then(
    onFulfilled?: ((value: any) => any | PromiseLike) | undefined | null,
    onRejected?: ((reason: any) => any | PromiseLike) | undefined | null
  ): SlimPromise {
    /**
     * 2.2.1.1 If onFulfilled is not a function, it must be ignored.
     */
    /**
     * 2.2.1.2 If onRejected is not a function, it must be ignored.
     */
    /**
     * “exception” is a value that is thrown using the throw statement.
     */
    // 2.2.7.1 If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x).
    let next = new SlimPromise((resolve, reject) => {
      /**
       * 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code
       */
      let cb = {
        onFulfilled,
        onRejected,
        reject,
      };
      if (this.state === PROMISE_STATES.pending) {
        this.fulfilledQueue.push(() => {
          this.invokeCallback(next, cb);
        });
        this.rejectedQueue.push(() => {
          this.invokeCallback(next, cb);
        });
      } else {
        platformWrapper(() => this.invokeCallback(next, cb));
      }
    });
    return next;
  }

  public catch(rejectedCallback): PromiseLike {
    return this.then(null, rejectedCallback);
  }

  // resolve when all Promises are resolved
  static all(ps: Array<SlimPromise | PromiseLike>): SlimPromise {
    let len = 0;
    let resultArr = [];
    return new SlimPromise((resolve, reject) => {
      try {
        for (let index = 0; index < ps.length; index++) {
          let promise = ps[index];
          promise.then((res) => {
            resultArr[index] = res;
            len++;
            if (len === ps.length) {
              // all resolved
              resolve(resultArr);
            }
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  static resolve(value: PromiseValue | any) {
    if (value instanceof SlimPromise) {
      return value;
    }
    return new SlimPromise((resolve) => resolve(value));
  }

  static reject(value: PromiseValue | any): SlimPromise {
    return new SlimPromise((_, reject) => reject(value));
  }

  // return the first Promise that resolved or rejected
  static race(ps: Array<PromiseLike>): SlimPromise {
    return new SlimPromise((resolve, reject) => {
      try {
        for (let index = 0; index < ps.length; index++) {
          let promise = ps[index];
          promise.then((res) => {
            resolve(res);
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  // execute finally callback after resolved/rejected
  public finally(callback: any) {
    return this.then(
      (value) => SlimPromise.resolve(callback()).then(() => value),
      (reason) =>
        SlimPromise.resolve(callback()).then(() => {
          throw new Error(reason);
        })
    );
  }
}

export default SlimPromise;
