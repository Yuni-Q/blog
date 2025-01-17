(function () {
  class Invitation {
    private when: Date;
  }

  class Ticket {
    private fee: number;

    getFee() {
      return this.fee;
    }
  }

  class Bag {
    private ticket: Ticket | null = null;

    constructor(
      private amount: number,
      private invitation: Invitation | null,
    ) {}

    hasInvitation(): boolean {
      return !!this.invitation;
    }

    hasTicket(): boolean {
      return !!this.ticket;
    }

    setTicket(ticket: Ticket): void {
      this.ticket = ticket;
    }

    minusAmount(amount: number): void {
      this.amount -= amount;
    }
  }

  class Audience {
    constructor(private bag: Bag) {}

    getBag(): Bag {
      return this.bag;
    }
  }

  class TicketOffice {
    constructor(private amount: number, private tickets: Ticket[] = []) {}

    getTicket(): Ticket {
      return this.tickets.shift();
    }

    plusAmount(amount: number): void {
      this.amount += amount;
    }
  }

  class TicketSeller {
    constructor(private ticketOffice: TicketOffice) {}

    getTicketOffice(): TicketOffice {
      return this.ticketOffice;
    }
  }

  class Theater {
    constructor(private ticketSeller: TicketSeller) {}

    enter(audience: Audience): void {
      // 소극장은 먼저 관람객의 가방 안에 초대장이 들어 있는지 확인합니다.
      if (audience.getBag().hasInvitation()) {
        // 초대장이 들어 있다면 이벤트에 당첨된 관람객이므로 판매원에게 받은 티켓을 관람객 가방 안에 넣어줍니다.
        const ticket = this.ticketSeller.getTicketOffice().getTicket();
        audience.getBag().setTicket(ticket);
      } else {
        // 가방 안에 초대장이 없다면 티켓을 판매해야 합니다.
        const ticket = this.ticketSeller.getTicketOffice().getTicket();
        audience.getBag().minusAmount(ticket.getFee());
        this.ticketSeller.getTicketOffice().plusAmount(ticket.getFee());
        audience.getBag().setTicket(ticket);
      }
    }
  }
})();
