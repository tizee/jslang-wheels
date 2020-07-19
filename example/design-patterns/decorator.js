const {
  Coffee,
  MochaDecorator,
  WhipDecorator,
} = require('../../dist/patterns/structural/decorator');

let aCupOfCoffee = new Coffee();
let aCupOfMocha = new MochaDecorator(aCupOfCoffee);
let mochaAddWhip = new WhipDecorator(aCupOfMocha);
console.log(aCupOfCoffee.cost(), aCupOfCoffee.getDesc());
console.log(aCupOfMocha.cost(), aCupOfMocha.getDesc());
console.log(mochaAddWhip.cost(), mochaAddWhip.getDesc());
