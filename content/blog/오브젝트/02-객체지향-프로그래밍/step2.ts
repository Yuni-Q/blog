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

    getMovieFee(): number {
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
    getFee(): number {
      return 1;
    }
    calculateMovieFee(screening: Screening): Money {
      return new Money(1);
    }
  }

  class Customer {}

  class Reservation {
    constructor(
      private customer: Customer,
      private screening: Screening,
      private money: Money,
      private audienceCount: number,
    ) {}
  }

  // 저장하는 값이 금액과 관련돼 있다는 의미를 가집니다.
  // 또한 금앵꽈 관련된 로직이 서로 다른 곳에 중복되어 구현되는 것을 막을 수 있습니다.

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
})();
