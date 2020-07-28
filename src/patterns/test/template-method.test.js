import { CaffeinBeverage, Coffee, Tea } from '../behavioral/template-method';

describe('Template Method Pattern', () => {
  test('use similar procedure', () => {
    let coffee = new Coffee();
    let tea = new Tea();
    expect(coffee).toBeInstanceOf(CaffeinBeverage);
    expect(tea).toBeInstanceOf(CaffeinBeverage);
    coffee.prepareRecipe();
    tea.prepareRecipe();
  });
});
