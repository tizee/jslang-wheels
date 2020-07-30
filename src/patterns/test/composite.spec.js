import { Menu, MenuItem, MenuComponent } from '../structural/composite';

describe('Composite Pattern', () => {
  test('should print all menus', () => {
    let allMenus = new Menu('All menus');
    let menu1 = new Menu('food');
    let menu2 = new Menu('pc');
    // add menu
    allMenus.addComponent(menu1);
    allMenus.addComponent(menu2);
    // add menuItem
    menu1.addComponent(new MenuItem('rice', 10));
    menu1.addComponent(new MenuItem('noodle', 12));
    menu2.addComponent(new MenuItem('cpu', 100));
    menu2.addComponent(new MenuItem('gpu', 200));
    menu2.addComponent(new MenuItem('display', 100));
    allMenus.print();
  });
});
