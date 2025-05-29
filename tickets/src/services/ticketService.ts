"use strict";

import {TicketRepository} from "../repositories/ticketRepository";

const repository = new TicketRepository()

export class TicketService {
    #title: string = ""
    #price: number = 0
    #id: string = ""
    #limit: object = Object()
    #orderId: string = ""


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
     * Set is
     * @param {string} orderId
     * @return {this}
     */
    setOrderId(orderId: string) {
        this.#orderId = orderId
        return this
    }

    /**
     * Get orderId
     * @return {string}
     */
    getOrderId() {
        return this.#orderId
    }


    /**
     * Create ticket
     * @return {object}
     */
    async createTicket() {
        return await repository
            .create(this.getTitle(), this.getPrice(), this.getOrderId())
    }

    /**
     * Get ticket
     * @return {object}
     */
    async getTicket() {
        return await repository.findById(this.getId())
    }

    /**
     * Get users
     * @return {object}
     */
    async getTickets() {
        return await repository
            .findAll(this.getLimit())
    }

    /**
     * Update ticket
     * @return {object}
     */
    async updateTicket() {
        return await repository
            .update(this.getId(), this.getTitle(), this.getPrice(), this.getOrderId())
    }

    /**
     * Delete ticket
     * @return {void}
     */
    async deleteTicket() {
        await repository.delete(this.getId())
    }
}