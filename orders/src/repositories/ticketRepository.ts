"use strict";

import Ticket from "../models/ticket";

export class TicketRepository {

    /**
     * create a new ticket
     * @param id
     * @param title
     * @param price
     * @return {object}
     */
    async create(id: string, title: string, price: number) {
        return await Ticket.create({_id: id, title, price})
    }

    /**
     * Find ticket
     * @param id
     * @return {object}
     */
    async findById(id: string) {
        return await Ticket
            .findById(id)
            .exec()
    }

    /**
     *
     * @param limit
     * @return {object}
     */
    async findAll(limit: object) {
        return await Ticket
            .find()
            .select("price title _id")
            .sort({createdAt: -1})
            .limit(limit)
            .lean()
    }

    /**
     * Delete ticket
     * @param id
     * @return {void}
     */
    async delete(id: string) {
        await Ticket.findOneAndDelete({_id: id})
    }

    /**
     * update ticket
     * @param id
     * @param title
     * @param price
     * @return {object}
     */
    async update(id: string, title: string, price: number) {
        await Ticket.findOneAndUpdate({_id: id}, {
            title,
            price,
        })
        return await Ticket
            .findById(id)
            .exec()
    }
}