"use strict";

import Order from "../models/order";

export class OrderRepository {

    /**
     * Create a new order
     * @param id
     * @param status
     * @param price
     * @return {object}
     */
    async create(id: string, status: string, price: number) {
        const _id = id
        return await Order.create({_id, status, price})
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
            .select("status price")
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
     * @param price
     */
    async update(id: string, status: string, price: number) {
        await Order.findOneAndUpdate({_id: id}, {
            status,
            price
        })
        return await Order
            .findById(id)
            .exec()
    }
}