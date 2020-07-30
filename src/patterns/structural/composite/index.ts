abstract class MenuComponent {
  getPrice() {
    // noop
    throw new Error('Not supported operation');
  }
  print() {
    // noop
    throw new Error('Not supported operation');
  }
  addComponent(c: MenuComponent) {
    // noop
    throw new Error('Not supported operation');
  }
  removeComponent(c: MenuComponent) {
    // noop
    throw new Error('Not supported operation');
  }
  getChild(num: number) {
    // noop
    throw new Error('Not supported operation');
  }
  iterator() {
    // noop
    throw new Error('Not supported operation');
  }
}

// composite
class Menu extends MenuComponent {
  menuList: Array<MenuComponent>;
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
    this.menuList = [];
  }
  addComponent(c: MenuComponent) {
    // could be a submenu or a menu item
    this.menuList.push(c);
  }
  removeComponent(c: MenuComponent) {
    // could be a submenu or a menu item
    this.menuList = this.menuList.filter((el) => {
      return el !== c;
    });
  }

  print() {
    console.log('Menu ' + this.name);
    let it = this.menuList.values();
    let cur = it.next();
    while (!cur.done) {
      cur.value.print();
      cur = it.next();
    }
  }

  getChild(num: number) {
    if (num > this.menuList.length) {
      return undefined;
    }
    return this.menuList[num];
  }
}

// leaf
class MenuItem extends MenuComponent {
  name: string;
  price: number;
  constructor(name: string, price: number) {
    super();
    this.name = name;
    this.price = price;
  }
  getPrice() {
    return this.price;
  }
  print() {
    console.log(this.name + ' ' + this.price);
  }
}

export { MenuItem, Menu, MenuComponent };
