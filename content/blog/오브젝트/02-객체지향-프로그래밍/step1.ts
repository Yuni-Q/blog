(function () {
  // Screening 클래스는 사용자들이 앰하는 대상인 '상영'을 구현합니다.
  class Screening {
    constructor(
      // 외부에서는 객체의 접근할 수 없도록 막습니다.
      public movie: Movie,
      private sequence: number,
      private whenScreened: Date,
    ) {}

    // public 메서드를 통해서만 내부 상태를 변경할 수 있게 해야 합니다.
    getStartTime(): Date {
      return this.whenScreened;
    }

    isSequence(sequence: number): boolean {
      return this.sequence === sequence;
    }

    getMovieFee(): number {
      return this.movie.getFee();
    }
  }
  class Movie {
    getFee(): number {
      return 1;
    }
  }
})();
