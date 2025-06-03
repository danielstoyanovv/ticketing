"use strict";

import {OrderRepository} from "../repositories/orderRepository";

const repository = new OrderRepository()

export class OrderService {
    #status: string = ""
    #price: number = 0
    #id: string = ""
    #limit: object = Object()

    /**
     * get status
     * @return string
     */
    getStatus(): string {
        return this.#status;
    }

    /**
     * set status
     * @param status
     * @return this
     */
    setStatus(status: string) {
        this.#status = status;
        return this
    }

    /**
     * get price
     * @return string
     */
    getPrice(): number {
        return this.#price;
    }


    /**
     * set price
     * @param price
     * @return {this}
     */
    setPrice(price: number) {
        this.#price = price;
        return this
    }

    /**
     * Set is
     * @param {string} id
     * @return {this}
     */
    setId(id: string) {
        this.#id = id
        return this
    }

    /**
     * Get id
     * @return {string}
     */
    getId() {
        return this.#id
    }

    /**
     * Set limit
     * @param {object} limit
     * @return {this}
     */
    setLimit(limit: object) {
        this.#limit = limit
        return this
    }

    /**
     * Get limit
     * @return {object}
     */
    getLimit() {
        return this.#limit
    }

    /**
     * Create order
     * @return {object}
     */
    async createOrder() {
        return await repository
            .create(this.getId(), this.getStatus(), this.getPrice())
    }

    /**
     * Get order
     * @return {object}
     */
    async getOrder() {

        return await repository.findById(this.getId())
    }

    /**
     * Get orders
     * @return {object}
     */
    async getOrders() {
        return await repository
            .findAll(this.getLimit())
    }

    /**
     * Delete order
     * @return {void}
     */
    async deleteOrder() {
        await repository.delete(this.getId())
    }

    /**
     * Update order
     * @return {object}
     */
    async updateOrder() {
        return await repository
            .update(this.getId(), this.getStatus(), this.getPrice())
    }
}