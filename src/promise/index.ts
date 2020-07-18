/**
 * A promise must be in one of three states: pending, fulfilled, or rejected.
 */
enum PROMISE_STATES {
  pending,
  fulfilled,
  rejected,
}

/**
 * “thenable” is an object or function that defines a then method.
 */
interface PromiseLike {
  then(
    onFulfilled?: ((value: any) => any | PromiseLike) | undefined | null,
    onRejected?: ((reason: any) => never | PromiseLike) | undefined | null
  ): PromiseLike;
}

/**
 * “value” is any legal JavaScript value (including undefined, a thenable, or a promise).
 */

type PromiseValue = null | undefined | PromiseLike | SlimPromise;

/**
 * “reason” is a value that indicates why a promise was rejected.
 */

interface PromiseExecutor {
  (
    resolve: (value?: unknown) => undefined,
    reject: (reason?: any) => undefined
  ): void;
}

/**
 * “promise” is an object or function with a then method whose behavior conforms to Promise/A+ spec.
 */
class SlimPromise implements PromiseLike {
  private state: PROMISE_STATES;
  private fullfilledQueue: Array<any>;
  private rejectQueue: Array<any>;
  private val: unknown;

  // the executor is called before the Promise constructor even returns the created object
  public constructor(executor: PromiseExecutor) {
    // init state
    this.state = PROMISE_STATES.pending;
    // execute callback when fulfilled
    this.fullfilledQueue = [];
    // execute callback when fulfilled
    this.rejectQueue = [];
    const handleResolve = (val?: PromiseValue): undefined => {
      if (this.state !== PROMISE_STATES.pending) return;
      // run in next event-loop with fresh stack
      setTimeout(() => {
        // update state in next event-loop iteration
        this.state = PROMISE_STATES.fulfilled;
        this.val = val;
        this.fullfilledQueue.forEach((callback) => callback(val));
      });
    };
    const handleReject = (reason?: any): undefined => {
      if (this.state !== PROMISE_STATES.pending) return;
      // run in next event-loop with fresh stack
      setTimeout(() => {
        // update state in next event-loop iteration
        this.state = PROMISE_STATES.fulfilled;
        this.val = reason;
        this.rejectQueue.forEach((callback) => callback(reason));
      });
    };
    try {
      executor(handleResolve, handleReject);
    } catch (error) {
      handleReject(error);
    }
  }
  /**
   *
   * In practice, this requirement ensures that onFulfilled and onRejected execute asynchronously, after the event loop turn in which then is called, and with a fresh stack. This can be implemented with either a “macro-task” mechanism such as setTimeout or setImmediate, or with a “micro-task” mechanism such as MutationObserver or process.nextTick
   * @param onFulfilled optional
   * @param onRejected optional
   */
  public then(
    onFulfilled?: ((value: any) => any | PromiseLike) | undefined | null,
    onRejected?: ((reason: any) => never | PromiseLike) | undefined | null
  ): SlimPromise {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = (res) => (res ? res : null);
    }
    if (typeof onRejected !== 'function') {
      /**
       * “exception” is a value that is thrown using the throw statement.
       */
      onRejected = (reason: any) => {
        throw new Error(reason instanceof Error ? reason.message : reason);
      };
    }
    let curPromise = this;
    return new SlimPromise((resolve, reject) => {
      curPromise.fullfilledQueue.push(() => {
        try {
          let res = onFulfilled(curPromise.val);
          if (res instanceof SlimPromise) {
            res.then(resolve, reject);
          } else {
            resolve(res);
          }
        } catch (error) {
          reject(error);
        }
      });
      curPromise.rejectQueue.push(() => {
        try {
          let res = onRejected(curPromise.val);
          if (res instanceof SlimPromise) {
            res.then(resolve, reject);
          } else {
            reject(res);
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  public catch(rejectedCallback): PromiseLike {
    return this.then(null, rejectedCallback);
  }

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
    return new SlimPromise((resolve, reject) => reject(value));
  }

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
}

export default SlimPromise;
