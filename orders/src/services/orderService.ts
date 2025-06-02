"use strict";

import {OrderRepository} from "../repositories/orderRepository";

const repository = new OrderRepository()

export class OrderService {
    #status: string = ""
    #expiredAt: Date = new Date
    #id: string = ""
    #limit: object = Object()
    #ticketId: string = ""


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
     * get ticket Id
     * @return string
     */
    getTicketId(): string {
        return this.#ticketId;
    }


    /**
     * set ticket Id
     * @param ticketId
     */
    setTicketId(ticketId: string) {
        this.#ticketId = ticketId;
        return this
    }


    /**
     * get Expired At
     * @return Date
     */
    getExpiredAt(): Date {
        return this.#expiredAt;
    }

    /**
     * set Expired At
     * @param expiredAt
     * return this
     */
    setExpiredAt(expiredAt: Date) {
        this.#expiredAt = expiredAt
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
            .create(this.getStatus(), this.getExpiredAt(), this.getTicketId())
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
            .update(this.getId(), this.getStatus(), this.getExpiredAt(), this.getTicketId())
    }
}