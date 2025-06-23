"use strict";

import {TicketServiceInterface} from "./ticketServiceInterface";
import {TicketRepositoryInterface} from "../repositories/ticketRepositoryInterface";

export class TicketService implements TicketServiceInterface {
    title: string = ""
    price: number = 0
    id: string = ""
    limit: object = Object()
    interface: TicketRepositoryInterface;

    constructor(repository: TicketRepositoryInterface) {
        this.interface = repository;
    }

    /**
     * get Title
     * @return string
     */
    getTitle(): string {
        return this.title;
    }

    /**
     * set title
     * @param value
     * @return this
     */
    setTitle(value: string) {
        this.title = value;
        return this
    }

    /**
     * getPrice
     * @return number
     */
    getPrice(): number {
        return this.price;
    }

    /**
     * set Price
     * @param value
     * @return this
     */
    setPrice(value: number) {
        this.price = value;
        return this
    }

    /**
     * Set is
     * @param {string} id
     * @return {this}
     */
    setId(id: string) {
        this.id = id
        return this
    }

    /**
     * Get id
     * @return {string}
     */
    getId() {
        return this.id
    }

    /**
     * Set limit
     * @param {object} limit
     * @return {this}
     */
    setLimit(limit: object) {
        this.limit = limit
        return this
    }

    /**
     * Get limit
     * @return {object}
     */
    getLimit() {
        return this.limit
    }

    /**
     * Create ticket
     * @return {object}
     */
    async createTicket() {
        return await this.interface
            .create(this.getId(), this.getTitle(), this.getPrice())
    }

    /**
     * Get ticket
     * @return {object}
     */
    async getTicket() {
        return await this.interface
            .findById(this.getId())
    }

    /**
     * Get users
     * @return {object}
     */
    async getTickets() {
        return await this.interface
            .findAll(this.getLimit())
    }

    /**
     * Delete ticket
     * @return {void}
     */
    async deleteTicket() {
        await this.interface
            .delete(this.getId())
    }

    /**
     * Update ticket
     * @return {object}
     */
    async updateTicket() {
        return await this.interface
            .update(this.getId(), this.getTitle(), this.getPrice())
    }
}