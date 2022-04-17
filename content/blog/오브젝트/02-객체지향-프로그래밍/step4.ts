(function () {
  class Screening {
    constructor(
      public movie: Movie,
      private sequence: number,
      private whenScreened: Date,
    ) {}

    getStartTime(): Date {
      return this.whenScreened;
    }

    isSequence(sequence: number): boolean {
      return this.sequence === sequence;
    }

    getMovieFee(): Money {
      return this.movie.getFee();
    }

    reserve(customer: Customer, audienceCount: number) {
      return new Reservation(
        customer,
        this,
        this.calculateFee(audienceCount),
        audienceCount,
      );
    }

    calculateFee(audienceCount: number): Money {
      return this.movie.calculateMovieFee(this).times(audienceCount);
    }
  }

  class Movie {
    constructor(
      private title: string,
      private runningTime: Duration,
      private fee: Money,
      private discountPolicy: DiscountPolicy,
    ) {}

    getFee(): Money {
      return this.fee;
    }
    calculateMovieFee(screening: Screening): Money {
      return this.fee.minus(
        this.discountPolicy.calculateDiscountAmount(screening),
      );
    }
  }

  class Customer {}

  class Reservation {
    constructor(
      private customer: Customer,
      private screening: Screening,
      private fee: Money,
      private audienceCount: number,
    ) {}
  }

  class Money {
    static ZERO = Money.wons(0);

    constructor(private amount: number) {}

    static wons(amount: number): Money {
      return new Money(amount);
    }

    plus(amount: Money): Money {
      return new Money(this.amount + amount.amount);
    }

    minus(amount: Money): Money {
      return new Money(this.amount - amount.amount);
    }

    times(percent: number): Money {
      return new Money(this.amount * percent);
    }

    isLessThan(other: Money): boolean {
      return this.amount < other.amount;
    }

    isGreaterThanOrEqual(other: Money): boolean {
      return this.amount >= other.amount;
    }
  }

  class Duration {}

  // 중복 된 코드를 두고 있는 부모 클래스 입니다.
  abstract class DiscountPolicy {
    // discountCondition를 인스턴스 변수로 가지기 때문에 하나의 할인 정책은 여러 개의 할인 조건을 포함할 수 있습니다.
    constructor(private conditions: DiscountCondition[]) {}
    calculateDiscountAmount(screening): Money {
      this.conditions.forEach((each) => {
        // 할인 조건을 만족하는 DiscountCondition이 하나라도 존재하는 경우에는 추상 메소드를 호출해 할인 요금을 계산합니다.
        if (each.isSatisfiedBy(screening)) {
          // 전체적인 흐름은 정의하지만 실제로 요금을 계산하는 부분은 추상 메서드에게 위임합니다. 실제로는 DiscountPolicy를 상속 받은 자식 클래스에서 오버라이딩한 메서드가 실행될 것입니다(TEMPLATE METHOD 패턴).
          return this.getDiscountAmount(screening);
        }
      });

      return Money.ZERO;
    }

    protected abstract getDiscountAmount(screening: Screening);
  }

  interface DiscountCondition {
    isSatisfiedBy(screening: Screening): boolean;
  }

  // 할인 여부를 판단하기 위해 사용할 순번(sequence)을 인스턴스 변수로 포함합니다.
  class SequenceCondition implements DiscountCondition {
    constructor(private sequence: number) {}

    isSatisfiedBy(screening: Screening): boolean {
      return screening.isSequence(this.sequence);
    }
  }

  // 상영 시작 시간이 특정한 기간 안에 포함되는지 여부를 판단해 할인 여부를 결정합니다.
  class PeriodCondition implements DiscountCondition {
    constructor(
      private dayOfWeek: DayOfWeek,
      private startTime: Date,
      private endTime: Date,
    ) {}
    isSatisfiedBy(screening: Screening): boolean {
      return (
        screening.getStartTime().getDay() === this.dayOfWeek &&
        this.startTime.getTime() <= screening.getStartTime().getTime() &&
        this.endTime.getTime() >= screening.getStartTime().getTime()
      );
    }
  }

  class DayOfWeek {}

  class AmountDiscountPolicy extends DiscountPolicy {
    constructor(
      private discountAmount: Money,
      conditions: DiscountCondition[],
    ) {
      super(conditions);
    }

    // Override
    protected getDiscountAmount(screening: Screening) {
      return this.discountAmount;
    }
  }

  class PercentDiscountPolicy extends DiscountPolicy {
    constructor(private percent: number, conditions: DiscountCondition[]) {
      super(conditions);
    }

    // Override
    protected getDiscountAmount(screening: Screening) {
      return screening.getMovieFee().times(this.percent);
    }
  }
})();
