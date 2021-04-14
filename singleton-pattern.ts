class Printer {
  // 외부에 제공할 자기 자신의 인스턴스
  private static printer: Printer = null;
  private constructor() {
    console.log('Printer constructor');
  }
  // 자기 자신의 인스턴스를 외부에 제공
  public static getPrinter(): Printer {
    if (this.printer == null) {
      // Printer 인스턴스 생성
      this.printer = new Printer();
    }
    return this.printer;
  }
  public print(str: string) {
    console.log(str);
  }
}

class User {
  private name: string;
  public constructor(name: string) {
    this.name = name;
  }
  public print() {
    const printer = Printer.getPrinter();
    printer.print(this.name + ' print using ');
  }
}
const USER_NUM = 5;
const user = [];
for (let i = 0; i < USER_NUM; i++) {
  // User 인스턴스 생성
  user[i] = new User((i + 1).toString());
  user[i].print();
}
