// method invocation
// use command pattern to undo
// 将动作的请求者与动作的接收执行者中解耦
// 利用命令对象：将请求（动作）封装成一个特定的对象（动作的对象），每次请求动作时，就调用动作对象执行，这样，请求者只需要和动作对象沟通，不需要了解其细节实现
interface Command {
  execute(): void;
  undo(): void;
}

// Receiver
interface Container {
  add();
  decrease();
  total();
}

class SwimPool implements Container {
  private amount: number;
  constructor() {
    this.amount = 0;
  }
  add() {
    this.amount += 1;
  }
  decrease() {
    this.amount -= 1;
  }
  total() {
    return this.amount;
  }
}

class Bottle implements Container {
  private amount: number;
  constructor() {
    this.amount = 0;
  }
  add() {
    this.amount += 10;
  }
  decrease() {
    this.amount -= 10;
  }
  total() {
    return this.amount;
  }
}

class AddCommand implements Command {
  ct: Container;
  constructor(ct: Container) {
    this.ct = ct;
  }
  execute() {
    this.ct.add();
  }
  undo() {
    this.ct.decrease();
  }
}

class DescreaseCommand implements Command {
  ct: Container;
  constructor(ct: Container) {
    this.ct = ct;
  }
  execute() {
    this.ct.decrease();
  }
  undo() {
    this.ct.add();
  }
}

class EmptyCommand implements Command {
  execute() {}
  undo() {}
}
interface Invoker {
  setCommandObj(id: number, onCommand: Command, offCommand: Command);
}

class RemoteController implements Invoker {
  private addSlots: Array<Command>;
  private descreseSlots: Array<Command>;
  private history: Array<Command>;
  constructor() {
    this.history = [];
    this.addSlots = new Array(2);
    this.descreseSlots = new Array(2);
    let empty = new EmptyCommand();
    for (let index = 0; index < 2; index++) {
      this.addSlots[index] = empty;
      this.descreseSlots[index] = empty;
    }
  }
  setCommandObj(idx: number, onCommand: Command, offCommand: Command) {
    this.addSlots[idx] = onCommand;
    this.descreseSlots[idx] = offCommand;
  }
  buttonOnPressed(idx: number) {
    this.addSlots[idx].execute();
    this.history.push(this.addSlots[idx]);
  }
  buttonOffPressed(idx: number) {
    this.descreseSlots[idx].execute();
    this.history.push(this.descreseSlots[idx]);
  }
  undoPressed() {
    // stack
    const undoCmd = this.history.pop();
    undoCmd.undo();
  }
}

// meat command pattern
class MacroCommand implements Command {
  commands: Array<Command>;
  constructor(cmds: Array<Command>) {
    this.commands = cmds;
  }

  execute() {
    for (let index = 0; index < this.commands.length; index++) {
      const element = this.commands[index];
      element.execute();
    }
  }

  undo() {
    for (let index = 0; index < this.commands.length; index++) {
      const element = this.commands[index];
      element.undo();
    }
  }
}

export {
  RemoteController,
  Bottle,
  SwimPool,
  AddCommand,
  DescreaseCommand,
  MacroCommand,
};
