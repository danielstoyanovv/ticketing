"use strict";

import {OrderRepositoryinterface} from "../repositories/orderRepositoryInterface";
import {OrderServiceinterface} from "./orderServiceInterface";


export class OrderService implements OrderServiceinterface {
    status: string = ""
    price: number = 0
    id: string = ""
    limit: object = Object()
    interface: OrderRepositoryinterface;

    constructor(repository: OrderRepositoryinterface) {
        this.interface = repository;
    }

    /**
     * get status
     * @return string
     */
    getStatus(): string {
        return this.status;
    }

    /**
     * set status
     * @param status
     * @return this
     */
    setStatus(status: string) {
        this.status = status;
        return this
    }

    /**
     * get price
     * @return string
     */
    getPrice(): number {
        return this.price;
    }


    /**
     * set price
     * @param price
     * @return {this}
     */
    setPrice(price: number) {
        this.price = price;
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
     * Create order
     * @return {object}
     */
    async createOrder() {
        return await this.interface
            .create(this.getId(), this.getStatus(), this.getPrice())
    }

    /**
     * Get order
     * @return {object}
     */
    async getOrder() {
        return await this.interface
            .findById(this.getId())
    }

    /**
     * Get orders
     * @return {object}
     */
    async getOrders() {
        return await this.interface
            .findAll(this.getLimit())
    }

    /**
     * Delete order
     * @return {void}
     */
    async deleteOrder() {
        await this.interface
            .delete(this.getId())
    }

    /**
     * Update order
     * @return {object}
     */
    async updateOrder() {
        return await this.interface
            .update(this.getId(), this.getStatus(), this.getPrice())
    }
}