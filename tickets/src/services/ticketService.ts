"use strict";

import {TicketRepository} from "../repositories/ticketRepository";

const repository = new TicketRepository()

export class TicketService {
    #title: string = ""
    #price: number = 0

    /**
     * get Title
     * @return string
     */
    getTitle(): string {
        return this.#title;
    }

    /**
     * set title
     * @param value
     * @return this
     */
    setTitle(value: string) {
        this.#title = value;
        return this
    }

    /**
     * getPrice
     * @return number
     */
    getPrice(): number {
        return this.#price;
    }

    /**
     * set Price
     * @param value
     * @return this
     */
    setPrice(value: number) {
        this.#price = value;
        return this
    }

    /**
     * Create ticket
     * @return {object}
     */
    async createTicket() {
        return await repository
            .create(this.getTitle(), this.getPrice())
    }
}