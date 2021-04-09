abstract class Colleague {
  protected mediator: Mediator;
  abstract id: number;

  join(mediator: Mediator) {
    this.mediator = mediator;
    mediator.addColleague(this);
  }

  sendData(data: string) {
    if (!this.mediator) {
      throw new Error('mediator is null');
    }
    this.mediator.mediate(data);
  }

  abstract handle(data: string);
}

class ConcreteColleague extends Colleague {
  id: number;
  constructor() {
    super();
    this.id = Math.random();
  }
  handle(data: string) {
    console.log(this.id, data);
  }
}
abstract class Mediator {
  colleagues: Colleague[] = [];

  addColleague(colleague: Colleague) {
    if (!colleague) {
      throw new Error('colleague is null');
    }
    this.colleagues.push(colleague);
  }

  abstract mediate(data: string);
}

class ConcreteMediator extends Mediator {
  mediate(data: string) {
    this.colleagues.forEach((colleague) => {
      // 중재 기능 추가
      colleague.handle(data);
    });
  }
}

const App = () => {
  const mediator = new ConcreteMediator();

  const colleague1 = new ConcreteColleague();
  const colleague2 = new ConcreteColleague();
  const colleague3 = new ConcreteColleague();

  colleague1.join(mediator);
  colleague2.join(mediator);
  colleague3.join(mediator);

  colleague1.sendData('111');
  // 0.46935089666482166 111
  // 0.5558008755307144 111
  // 0.08946524585346682 111

  colleague2.sendData('222');
  // 0.46935089666482166 222
  // 0.5558008755307144 222
  // 0.08946524585346682 222

  colleague3.sendData('333');
  // 0.46935089666482166 333
  // 0.5558008755307144 333
  // 0.08946524585346682 333
};

App();
