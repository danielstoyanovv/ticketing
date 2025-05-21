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
    getTcketId(): string {
        return this.#ticketId;
    }


    /**
     * set ticket Id
     * @param ticketId
     */
    setTcketId(ticketId: string) {
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
     * Create ticket
     * @return {object}
     */
    async createOrder() {
        return await repository
            .create(this.getStatus(), this.getExpiredAt(), this.getTcketId())
    }

    /**
     * Get ticket
     * @return {object}
     */
    async getOrder() {
        return await repository.findById(this.getId())
    }

    /**
     * Get users
     * @return {object}
     */
    async getOrders() {
        return await repository
            .findAll(this.getLimit())
    }

    /**
     * Delete ticket
     * @return {void}
     */
    async deleteOrder() {
        await repository.delete(this.getId())
    }
}