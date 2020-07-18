const { StockData, StockDisplay } = require('../../dist/patterns/observer');

let sum = 1000;
const data = new StockData(sum);

const display1 = new StockDisplay(data);
const display2 = new StockDisplay(data);

// simple stock
setInterval(() => {
  sum += -2 + Math.random() * 2 + 1; // [-100,100]
  data.sumChange(sum.toFixed(2));
}, 1000);
