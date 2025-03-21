(function () {
  class DateTime {
    static getDateTime(hours: number, minutes: number): Date {
      return new Date(new Date(new Date().setHours(hours)).setMinutes(minutes));
    }
  }

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

  class Duration {
    static ofMinutes(time: number) {
      return time;
    }
  }

  interface DiscountPolicy {
    calculateDiscountAmount(screening): Money;
  }

  abstract class DefaultDiscountPolicy implements DiscountPolicy {
    constructor(private conditions?: DiscountCondition[]) {}
    calculateDiscountAmount(screening): Money {
      this.conditions.forEach((each) => {
        if (each.isSatisfiedBy(screening)) {
          return this.getDiscountAmount(screening);
        }
      });

      return Money.ZERO;
    }

    protected abstract getDiscountAmount(screening: Screening): Money;
  }

  interface DiscountCondition {
    isSatisfiedBy(screening: Screening): boolean;
  }

  class SequenceCondition implements DiscountCondition {
    constructor(private sequence: number) {}

    isSatisfiedBy(screening: Screening): boolean {
      return screening.isSequence(this.sequence);
    }
  }

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

  class DayOfWeek {
    static SUNDAY = 0;
    static MONDAY = 1;
    static TUESDAY = 2;
  }

  class AmountDiscountPolicy extends DefaultDiscountPolicy {
    constructor(
      private discountAmount: Money,
      conditions: DiscountCondition[],
    ) {
      super(conditions);
    }

    protected getDiscountAmount(screening: Screening) {
      return this.discountAmount;
    }
  }

  class PercentDiscountPolicy extends DefaultDiscountPolicy {
    constructor(private percent: number, conditions: DiscountCondition[]) {
      super(conditions);
    }

    protected getDiscountAmount(screening: Screening) {
      return screening.getMovieFee().times(this.percent);
    }
  }

  const avatar: Movie = new Movie(
    '아바타',
    Duration.ofMinutes(120),
    Money.wons(10000),
    new AmountDiscountPolicy(Money.wons(800), [
      new SequenceCondition(1),
      new SequenceCondition(10),
      new PeriodCondition(
        DayOfWeek.MONDAY,
        DateTime.getDateTime(10, 0),
        DateTime.getDateTime(11, 59),
      ),
      new PeriodCondition(
        DayOfWeek.TUESDAY,
        DateTime.getDateTime(10, 0),
        DateTime.getDateTime(20, 59),
      ),
    ]),
  );

  const titanic: Movie = new Movie(
    '타이타닉',
    Duration.ofMinutes(180),
    Money.wons(11000),
    new PercentDiscountPolicy(0.1, [
      new PeriodCondition(
        DayOfWeek.TUESDAY,
        DateTime.getDateTime(14, 0),
        DateTime.getDateTime(11, 59),
      ),
      new SequenceCondition(2),
      new PeriodCondition(
        DayOfWeek.TUESDAY,
        DateTime.getDateTime(10, 0),
        DateTime.getDateTime(13, 59),
      ),
    ]),
  );

  class NoneDiscountPolicy implements DiscountPolicy {
    calculateDiscountAmount(screening: Screening): Money {
      return Money.ZERO;
    }
  }

  const starWars = new Movie(
    '스타워즈',
    Duration.ofMinutes(180),
    Money.wons(10000),
    new NoneDiscountPolicy(),
  );
})();
