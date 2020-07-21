import { debounce, Debounce } from '../debounce/debounce';

class Test {
  constructor() {
    this.value = 0;
  }
  @Debounce(1000)
  Hello() {
    return 'hello';
  }
  @Debounce(2000, { leading: true, trailing: false })
  Say() {
    return 'what?';
  }
}

describe('Debounce', () => {});
