import {
  ProcessOrder,
  DeliveredOrderState,
  PayOrderState,
  ShipOrderState,
} from '../behavioral/state';

describe('Order State', () => {
  test('change state', () => {
    let p = new ProcessOrder();
    expect(p.state).toBeInstanceOf(PayOrderState);
    p.ship();
    p.deliver();
    p.pay();
    expect(p.state).toBeInstanceOf(ShipOrderState);
    p.pay();
    p.deliver();
    p.ship();
    expect(p.state).toBeInstanceOf(DeliveredOrderState);
    p.pay();
    p.ship();
    p.deliver();
  });
});
