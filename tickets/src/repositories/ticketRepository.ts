"use strict";

import Ticket from "../models/ticket";

export class TicketRepository {

    /**
     * create a new ticket
     * @param title
     * @param price
     * @param orderId
     * @return {object}
     */
    async create(title: string, price: number, orderId: string) {
        return await Ticket.create({title, price, orderId})
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
            .select("price title orderId _id")
            .sort({createdAt: -1})
            .limit(limit)
            .lean()
    }

    /**
     * update ticket
     * @param id
     * @param title
     * @param price
     * @param orderId
     * @return {object}
     */
    async update(id: string, title: string, price: number,  orderId: string) {
        await Ticket.findOneAndUpdate({_id: id}, {
            title,
            price,
            orderId
        })
        return await Ticket
            .findById(id)
            .exec()
    }

    /**
     * Delete ticket
     * @param id
     * @return {void}
     */
    async delete(id: string) {
        await Ticket.findOneAndDelete({_id: id})
    }
}