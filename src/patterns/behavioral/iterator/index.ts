interface MyIterator {
  hasNext(): boolean;
  next(): any;
}

class Menu {
  menu: Array<string>;
  constructor(menu: Array<string>) {
    this.menu = menu;
  }
  createIterator() {
    return new MenuIterator(this.menu);
  }
}

class MenuIterator implements MyIterator {
  private menu: Array<string>;
  private idx: number;
  constructor(menu: Array<string>) {
    this.menu = menu;
    this.idx = 0;
  }

  next() {
    if (this.hasNext()) {
      let str = this.menu[this.idx];
      this.idx++;
      return str;
    }
    return undefined;
  }

  hasNext() {
    if (this.idx >= this.menu.length) {
      return false;
    }
    return true;
  }
}

export { Menu, MenuIterator };
