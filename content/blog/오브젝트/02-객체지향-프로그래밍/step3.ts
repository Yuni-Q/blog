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

    // 코드 어디에도 할인 정책을 판단하는 코드는 존재하지 않습니다. 단지 discountPolicy에게 메시지를 전송할 뿐입니다.
    // `추상화(abstraction`라는 원리를 바탕으로 한 `상속(inheritance)`와 `다형성`이 숨겨져 있습니다.
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

  class DiscountPolicy {
    calculateDiscountAmount(screening): Money {
      return new Money(1);
    }
  }
})();
