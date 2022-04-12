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

    private hasTicket(): boolean {
      return !!this.ticket;
    }

    private setTicket(ticket: Ticket): void {
      this.ticket = ticket;
    }

    private minusAmount(amount: number): void {
      this.amount -= amount;
    }

    hold(ticket: Ticket): number {
      if (this.hasInvitation()) {
        this.setTicket(ticket);
        return 0;
      } else {
        this.setTicket(ticket);
        this.minusAmount(ticket.getFee());
        return ticket.getFee();
      }
    }
  }

  class Audience {
    constructor(private bag: Bag) {}

    buy(ticket: Ticket): number {
      return this.bag.hold(ticket);
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

    // ! NEW
    sellTicketTo(audience: Audience) {
      this.plusAmount(audience.buy(this.getTicket()));
    }
  }

  class TicketSeller {
    constructor(private ticketOffice: TicketOffice) {}

    sellTo(audience: Audience): void {
      // ! EDIT
      this.ticketOffice.sellTicketTo(audience);
    }
  }

  class Theater {
    constructor(private ticketSeller: TicketSeller) {}

    enter(audience: Audience): void {
      this.ticketSeller.sellTo(audience);
    }
  }
})();
