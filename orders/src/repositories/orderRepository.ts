"use strict";

import Order from "../models/order";

export class OrderRepository {

    /**
     * create new Order
     * @param status
     * @param expiredAt
     * @param ticketId
     * @return (object)
     */
    async create(status: string, expiredAt: Date, ticketId: string) {
        return await Order.create({status, expiredAt, ticketId})
    }

    /**
     * Find
     * @param id
     * @return {object}
     */
    async findById(id: string) {
        return await Order
            .findById(id)
            .exec()
    }

    /**
     * find all orders
     * @param limit
     * @return {object}
     */
    async findAll(limit: object) {
        return await Order
            .find()
            .select("status expiredAt ticketId")
            .sort({createdAt: -1})
            .limit(limit)
            .lean()
    }

    /**
     * Delete order
     * @param id
     * @return {void}
     */
    async delete(id: string) {
        await Order.findOneAndDelete({_id: id})
    }

    /**
     * Update order
     * @param id
     * @param status
     * @param expiredAt
     * @param ticketId
     * @return {object}
     */
    async update(id: string, status: string, expiredAt: Date, ticketId: string) {
        await Order.findOneAndUpdate({_id: id}, {
            status,
            expiredAt,
            ticketId
        })
        return await Order
            .findById(id)
            .exec()
    }
}