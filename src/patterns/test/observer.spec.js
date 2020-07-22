import { StockData, StockDisplay } from '../behavioral/observer';

describe('Observer', () => {
  test('should ', () => {
    let sum = 1000;
    const data = new StockData(sum);

    const display1 = new StockDisplay(data);
    const display2 = new StockDisplay(data);
    data.sumChange(1001);
    expect(display1.display()).toBe(1001);
    expect(display2.display()).toBe(1001);
  });
});

// // simple stock
// setInterval(() => {
//   sum += -2 + Math.random() * 2 + 1; // [-100,100]
//   data.sumChange(sum.toFixed(2));
// }, 1000);
