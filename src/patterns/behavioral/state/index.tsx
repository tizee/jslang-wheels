interface OrderState {
  pay(): void;
  ship(): void;
  delivere(): void;
}

class PayOrderState implements OrderState {
  proc: ProcessOrder;
  constructor(proc: ProcessOrder) {
    this.proc = proc;
  }
  pay() {
    console.log('Pay successfully');
    // change state
    this.proc.setState(this.proc.getShipOrderState());
  }
  ship() {
    console.log('You have not paid yet.');
  }
  delivere() {
    console.log('You have not paid yet.');
  }
}

class ShipOrderState implements OrderState {
  proc: ProcessOrder;
  constructor(proc: ProcessOrder) {
    this.proc = proc;
  }
  pay() {
    console.log('You have paid already.');
  }
  ship() {
    console.log('Under shipping.');
    // change state
    this.proc.setState(this.proc.getDeliverOrderState());
  }
  delivere() {
    console.log("Order hasn't been shipped yet.");
  }
}

class DeliveredOrderState implements OrderState {
  proc: ProcessOrder;
  constructor(proc: ProcessOrder) {
    this.proc = proc;
  }
  pay() {
    console.log('You have paid already.');
  }
  ship() {
    console.log('Order has been shipped already.');
  }
  delivere() {
    // change state
    console.log('Under delivering.');
  }
}

class ProcessOrder {
  state: OrderState;
  noPay: PayOrderState;
  beforeShip: ShipOrderState;
  beforeDeliver: DeliveredOrderState;
  constructor() {
    this.noPay = new PayOrderState(this);
    this.beforeShip = new ShipOrderState(this);
    this.beforeDeliver = new DeliveredOrderState(this);
    this.state = this.noPay;
  }
  pay() {
    this.state.pay();
  }

  ship() {
    this.state.ship();
  }

  deliver() {
    this.state.delivere();
  }

  setState(state: OrderState) {
    this.state = state;
  }
  getOrderState() {
    return this.state;
  }
  getPayOrderState() {
    return this.noPay;
  }
  getShipOrderState() {
    return this.beforeShip;
  }
  getDeliverOrderState() {
    return this.beforeDeliver;
  }
}

export { ProcessOrder, DeliveredOrderState, PayOrderState, ShipOrderState };
