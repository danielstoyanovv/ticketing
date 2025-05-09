"use strict";

import Ticket from "../models/ticket";

export class TicketRepository {

    /**
     * create a new ticket
     * @param title
     * @param price
     * @return {object}
     */
    async create(title: string, price: number) {
        return await Ticket.create({title, price})
    }
}