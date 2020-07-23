interface Observer {
  update(val?: any): void;
}

interface Subject {
  registerOb(ob: Observer): boolean;
  removeOb(ob: Observer): boolean;
  notfiyObs(): void;
}

export class StockData implements Subject {
  private obs: Set<Observer>; // observer list
  private sum: number;
  constructor(sum?: number) {
    this.obs = new Set();
    this.sum = sum || 0;
  }
  // pull method
  public getSum(): number {
    return this.sum;
  }
  public hasOb(ob: Observer): boolean {
    return this.obs.has(ob);
  }
  public registerOb(ob: Observer): boolean {
    if (this.hasOb(ob)) {
      return false;
    }
    this.obs.add(ob);
    return true;
  }
  public removeOb(ob: Observer): boolean {
    if (!this.hasOb(ob)) {
      return false;
    }
    this.obs.delete(ob);
    return true;
  }
  public notfiyObs(): void {
    this.obs.forEach((el) => {
      el.update(this.sum);
    });
  }
  public sumChange(val): void {
    this.sum = val;
    this.notfiyObs();
  }
}

export class StockDisplay implements Observer {
  private sum: number;
  constructor(data: StockData) {
    data.registerOb(this);
  }
  public update(val: number): void {
    this.sum = val;
    this.display();
  }
  public display(): number {
    console.log(this.sum);
    return this.sum;
  }
}
