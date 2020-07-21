import { throttle, Throttle } from '../throttle/throttle';

class Test {
  constructor() {
    this.count = 0;
  }
  @Throttle(1000, { leading: true, trailing: false })
  leading(val) {
    this.count++;
    return val;
  }
  @Throttle(1000, { leading: false, trailing: true })
  trailing(val) {
    this.count++;
    return val;
  }
  @Throttle(1000, { leading: true, trailing: true })
  both(val) {
    this.count++;
    return val;
  }
}

describe('Throttle ', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });
  test('should throttle a function', async () => {
    let count = 0;
    const throttled = throttle((val) => {
      count++;
      return val;
    }, 30);
    let result = [throttled(1), throttled(2), throttled(3)];
    expect(result).toStrictEqual([undefined, undefined, undefined]);
    expect(count).toBe(0);
    const callback = jest.fn(() => {
      let results = [throttled(4), throttled(5), throttled(6)];
      expect(results).toStrictEqual([3, 3, 3]);
      expect(count).toBe(1);
    });
    let p = new Promise((resolve) => {
      setTimeout(() => {
        callback();
        resolve();
      }, 90);
    });
    await p;
  });
  test('should support leading option', async () => {
    let count = 0;
    const leading = throttle(
      () => {
        count++;
      },
      1000,
      { leading: true, trailing: false }
    );
    leading(); // 0 + 1000 = 1000
    leading();
    leading();
    expect(count).toBe(1);
    const callback = jest.fn(() => {
      leading();
      leading();
      leading();
      expect(count).toBe(1);
    });
    let p = new Promise((resolve) => {
      setTimeout(() => {
        callback();
        resolve();
      }, 300);
    });
    await p;
  });
  test('should support trailing option', async () => {
    let obj = new Test();
    obj.trailing();
    obj.trailing();
    obj.trailing();
    expect(obj.count).toBe(0);
    const callback = jest.fn(() => {
      obj.trailing();
      obj.trailing();
      obj.trailing();
      expect(obj.count).toBe(1);
    });
    let p = new Promise((resolve) => {
      setTimeout(() => {
        callback(); // 0 + 1100 = 1100 ms > 1000ms, start new timer
        resolve();
      }, 1100);
    });
    await p; // 1100
    const callback2 = jest.fn(() => {
      expect(obj.count).toBe(2);
    });
    let p2 = new Promise((resolve) => {
      setTimeout(() => {
        callback2(); // invoke, 1000>=1000
        resolve();
      }, 1000);
    });
    await p2; // 1000ms
  });
  test('should support leading and trailing', async () => {
    // If leading and trailing options are true, func is invoked on the trailing edge of the timeout only if the throttled function is invoked more than once during the wait timeout.
    const obj = new Test();
    obj.both(); // should set a timer for trailing edge
    obj.both(); // delay to trailing edge
    obj.both(); // bypass
    expect(obj.count).toBe(1);
    let p = new Promise((resolve) => {
      setTimeout(() => {
        expect(obj.count).toBe(2); // trailing edge
        obj.both(); // leading edge
        obj.both(); // delay
        obj.both(); // bypass
        expect(obj.count).toBe(3);
        resolve();
      }, 1100);
    });
    await p; // 1100 > 1000
    let p2 = new Promise((resolve) => {
      setTimeout(() => {
        obj.both(); // bypass
        obj.both(); // bypass
        obj.both(); // bypass
        expect(obj.count).toBe(3);
        resolve();
      }, 500);
    });
    await p2; // 500 < 1000
    let p3 = new Promise((resolve) => {
      setTimeout(() => {
        expect(obj.count).toBe(4); // trailing edge
        resolve();
      }, 500);
    });
    await p3; // 500 + 500 >= 1000
  });

  test('leading should bypass', async () => {
    let obj = new Test();
    const p1 = new Promise((resolve) => {
      setTimeout(() => {
        const val = obj.leading(1); // invoke, 100 + 1000 = 1100
        expect(val).toBe(1);
        resolve();
      }, 100);
    });
    let prev = Date.now();
    await p1; // 100
    console.log('do 1', Date.now() - prev);
    const p2 = new Promise((resolve) => {
      setTimeout(() => {
        const val = obj.leading(2); // bypass, 100 + 600 = 700 < 1100
        expect(val).toBe(1);
        resolve();
      }, 600);
    });
    prev = Date.now();
    await p2; // 600
    console.log('do 2', Date.now() - prev);
    const p3 = new Promise((resolve) => {
      setTimeout(() => {
        const val = obj.leading(3); // invoke, 700 + 600 = 1300 > 1100, new timer with 1000ms, callback at 2300
        expect(val).toBe(3);
        resolve();
      }, 600);
    });

    prev = Date.now();
    await p3; // 600
    console.log('do 3', Date.now() - prev);
    const p4 = new Promise((resolve) => {
      setTimeout(() => {
        const val = obj.leading(4); // bypass, 300 < 1000
        expect(val).toBe(3);
        resolve();
      }, 300);
    });
    prev = Date.now();
    await p4; // 300
    console.log('do 4', Date.now() - prev);
    const p5 = new Promise((resolve) => {
      setTimeout(() => {
        const val = obj.leading(5); // bypass, 300 + 500 = 800 < 1000,
        expect(val).toBe(3);
        resolve();
      }, 500); // bypass inside a timer
    });
    prev = Date.now();
    await p5; // 500
    console.log('do 5', Date.now() - prev);
    const p6 = new Promise((resolve) => {
      setTimeout(() => {
        const val = obj.leading(6); // invoke, 800 + 700 > 1000
        expect(val).toBe(6);
        resolve();
      }, 700);
    });
    prev = Date.now();
    await p6; // 500
    console.log('do 6', Date.now() - prev);
    expect(obj.count).toBe(3);
  });
});
